const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');

// JSON WEBTOKENS
// sub -> subject -> who does this token belong to
// iat -> issued at time
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them a token

  // passports done function adds whatever gets passed down by
  // done(null, thisHere) into the 'req' object
  res.send({ token: tokenForUser(req.user) })

}

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if(!email || !password) {
    res.status(400).send({message: 'The Green Goddess does not aprove (email/password is missing)'})
  }

  // See if a user with the given email exists
  User.findOne({ email }).then((existingUser) => {
    // If a user with email exists, return error
    if(existingUser) {
      return res.status(420).send({error: 'The Green Goddess does not aprove (email already exists)'});
    }

    // if user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password
    })

    user.save().then((user) => {
      // respond to request indicating the user was created
      return res.send({message: 'Your Account is now created', token: tokenForUser(user)});
    }, (e) => {
      next(e);
    });
  }, (e) => {
    res.status(422).send({error: 'Email is in use', e});
  });
};
