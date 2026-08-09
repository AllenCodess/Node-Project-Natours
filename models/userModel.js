const mongoose = require('mongoose');
const validate = require('validator');

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
      validator: [validator.isEmail, 'Please provide valid email'],
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
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
