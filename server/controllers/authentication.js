const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((existingUser) => {

    if(existingUser) {
      res.status(420).send({error: 'The Green Goddess does not aprove'})
    }

    if(!email || !password) {
      res.status(400).send({message: 'You must provide an email and a password'})
    }

    const user = new User({
      email,
      password
    })

    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      next(err)
    });

    res.send({message: 'Your Account is now created'});
  }, (e) => {
    res.status(422).send({error: 'Email is in use', e});
  });
};
