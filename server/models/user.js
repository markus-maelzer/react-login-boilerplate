const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})
// On Save Hook, encrypt password
// "pre" -> Before saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this;
  console.log('user', user);

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if(err) {
      console.log('ERROR: ', err);
      return next(err);
    }


    // has (encrypt) the password using salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) {return next(err);}

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  })
})

const User = mongoose.model('User', userSchema);


module.exports = User;
