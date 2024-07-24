const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user'); // Your user model

const secret = 'your_secret_key'; // Use an environment variable in production

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if user exists and password is correct (pseudo code)
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
