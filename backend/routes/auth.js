const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for protected routes
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
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
    const user = new User({ name, username, email, password: hashedPassword, role: role || 'public', phone, location });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, phone: user.phone, location: user.location, createdAt: user.createdAt }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email/Username and password required' });
    let user = await User.findOne({ email }) || await User.findOne({ username: email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { _id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, phone: user.phone, location: user.location, createdAt: user.createdAt }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user (profile)
router.get('/me', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
