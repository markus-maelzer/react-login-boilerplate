const Authentication = require('./controllers/authentication');

const User = require('./models/user');

module.exports = app => {
  app.post('/signup', Authentication.signup);

  app.get('/signup', (req, res) => {
    User.find().then((user) => {
    res.send({user});
  }, (e) => {
    res.status(400).send(e);
  })
  })
};
