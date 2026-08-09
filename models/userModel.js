const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Passwords must match'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password needs to match',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
