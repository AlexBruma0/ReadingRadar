// refreshToken.model.js

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d', // Automatically delete expired tokens after 30 days
  },
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
