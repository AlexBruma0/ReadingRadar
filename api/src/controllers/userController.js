const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


async function registerUser(userName, password, email, theme, profilePicture) {
  const newUser = new User({
    userName,
    password, 
    email,
    theme,
    profilePicture
  });
  return newUser.save();
}

async function loginUser(email, password) {
  const user = await User.findOne({ email, password }); 
  if (!user) {
    throw new Error('Invalid login credentials');
  }

const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key); 
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
async function updateProfilePicture(userId, profilePicture) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.profilePicture = profilePicture;
    await user.save();
  } catch (error) {
    throw error;
  }
}
async function getUser(userId) {
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
  updateProfilePicture
};