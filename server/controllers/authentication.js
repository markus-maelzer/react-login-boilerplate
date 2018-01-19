const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400).send({message: 'The Green Goddess does not aprove (email/password is missing)'})
  }

  User.findOne({ email }).then((existingUser) => {
    if(existingUser) {
      return res.status(420).send({error: 'The Green Goddess does not aprove (email already exists)'});
    }

    const user = new User({
      email,
      password
    })

    user.save().then((user) => {
      return res.send({message: 'Your Account is now created'});
    }, (e) => {
      next(e);
    });
  }, (e) => {
    res.status(422).send({error: 'Email is in use', e});
  });
};
