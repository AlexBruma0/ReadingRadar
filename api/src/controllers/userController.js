const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


async function registerUser(userName, password, email, theme, profilePicture) {
  const newUser = new User({
    userName,
    password, // In practice, you should hash the password before saving
    email,
    theme,
    profilePicture
  });
  return newUser.save();
}

async function loginUser(email, password) {
  const user = await User.findOne({ email, password }); // Again, use hashing in production
  if (!user) {
    throw new Error('Invalid login credentials');
  }

const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key); // Replace with your secret key
  const userId = user._id
  return {token,userId};
}

async function getUsers() {
  const users = await User.find();
  if (!users) {
    throw new Error('no users');
  }
  return users
}

async function getUser(userId) {
  console.log(userId)
  const users = await User.findById(userId);
  if (!users) {
    throw new Error('no users');
  }
  return users
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
};