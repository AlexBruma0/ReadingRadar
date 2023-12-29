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

router.get('/', async (req, res) => {
  try {
    const users = await userController.getUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userController.getUser(userId);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
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