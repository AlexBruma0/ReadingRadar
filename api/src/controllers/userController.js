const User = require('../models/UserSlice');
const jwt = require('jsonwebtoken');

async function registerUser(userName, password, email) {
  const newUser = new User({
    userName,
    password, // In practice, you should hash the password before saving
    email,
  });
  return newUser.save();
}

async function loginUser(userName, password) {
  const user = await User.findOne({ userName, password }); // Again, use hashing in production
  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key); // Replace with your secret key
  const userId = user._id
  return {token,userId};
}

module.exports = {
  registerUser,
  loginUser,
};