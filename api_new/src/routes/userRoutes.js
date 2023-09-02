const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    await userController.registerUser(userName, password, email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not register user.' });
  }
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const {token,userId} = await userController.loginUser(userName, password);
    res.json({ token,userId });
  } catch (error) {
    res.status(401).json({ error: 'Invalid login credentials.' });
  }
});

module.exports = router;