const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  theme: String
});

module.exports = mongoose.model('User', userSchema);