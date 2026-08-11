const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
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

// if password is not modified then return. else execute the code
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12); // original password equal to encrypted password with a salt lvl of 12
  this.passwordConfirm = undefined; // doesnt presist the old password in the database
});

const User = mongoose.model('User', userSchema);
module.exports = User;
