const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Auth middleware (keeps here and exported below)
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');

    // decoded may contain { userId: ... } based on sign in below
    const userId = decoded.userId || decoded.id || decoded._id || decoded.user || decoded.userid;
    if (!userId) return res.status(401).json({ message: 'Token missing user id' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // store full user document for downstream handlers
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, role, phone, location } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, password required' });

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    if (username) {
      let userByUsername = await User.findOne({ username });
      if (userByUsername) return res.status(400).json({ message: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || 'public',
      phone: phone || '',
      location: location || ''
    });

    await user.save();

    // Sign token with { userId: ... } — auth middleware reads decoded.userId
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key-here', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email/Username and password required' });

    // support login by email or username
    let user = await User.findOne({ email }) || await User.findOne({ username: email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key-here', { expiresIn: '7d' });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user (profile)
router.get('/me', auth, (req, res) => {
  // auth middleware sets req.user to the full user doc (without password)
  res.json({ success: true, user: req.user });
});

module.exports = router;

// Also export auth middleware so other route files can import it
module.exports.auth = auth;
