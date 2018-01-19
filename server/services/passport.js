const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

// Create local Strategy
const localOptions = {
  usernameField: 'email'
}
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email }).then((user) => {
    if(!user) { return done(null, false)}

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if(err) { return done(err, false); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    })
  }, (e) => {
    return done(e);
  });
})

// Setup options for JWT JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call 'done' without a user object

  User.findById(payload.sub).then((user) => {
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }, (e) => {
    return done(e, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
