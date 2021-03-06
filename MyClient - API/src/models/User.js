// models/user.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    }
});

module.exports = mongoose.model('User', userSchema);