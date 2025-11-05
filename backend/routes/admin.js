const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
};

router.get('/users', auth, adminAuth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.delete('/users/:id', auth, adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.get('/stats', auth, adminAuth, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const farmers = await User.countDocuments({ role: 'farmer' });
  const experts = await User.countDocuments({ role: 'expert' });
  const publicUsers = await User.countDocuments({ role: 'public' });
  res.json({ totalUsers, farmers, experts, publicUsers });
});

module.exports = router;
