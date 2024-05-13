const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const multerS3 = require('multer-s3');

const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

const s3 = new S3Client({ 
  region: "us-east-1",
  credentials: fromEnv() // Use fromEnv() to load credentials from environment variables
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'awsbookbucket2',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});


router.post('/register', upload.single('profilePicture') ,async (req, res) => {
  
  try {
    const { userName, password, email, theme } = req.body;
    const profilePicture = req.file.location;
    const user = await userController.registerUser(userName, password, email, theme, profilePicture);
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key);
    res.status(201).json({ jwtToken:token, userId: user._id, userName: user.userName, theme: user.theme, profilePicture: user.profilePicture });
  } catch (error) {
    res.status(500).json({ error: 'Could not register user.' });
  }
});

router.put('/:id/profilePicture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePicture = req.file.location;
    await userController.updateProfilePicture(userId, profilePicture);
    res.status(200).json({ message: 'Profile picture updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update profile picture.' });
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



router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const {token,userId} = await userController.loginUser(email, password);

    res.json({ token,userId });
  
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid login credentials.' });
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userController.getUser(userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;