// refreshToken.route.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

const router = express.Router();

// Endpoint to authenticate the user and generate/save a refresh token
router.post(
  '/generate',
  passport.authenticate('local', { session: false }), // Use the local strategy for authentication
  async (req, res) => {
    try {
      // User authentication succeeded, so req.user contains the authenticated user
      const user = req.user;

      // Generate a new refresh token
      const refreshToken = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '30d',
      });

      // Save the refresh token in the database
      const newRefreshToken = new RefreshToken({
        user: user._id,
        token: refreshToken,
      });
      await newRefreshToken.save();

      res.status(201).json({ refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate refresh token' });
    }
  }
);

module.exports = router;
