const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (NO AUTH for now)
router.get('/users', async (req, res) => {
  try {
    console.log('🔵 Fetching all users...');
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    console.log(`✅ Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Delete user (NO AUTH for now)
router.delete('/users/:id', async (req, res) => {
  try {
    console.log('🔵 Deleting user:', req.params.id);
    await User.findByIdAndDelete(req.params.id);
    console.log('✅ User deleted');
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Get statistics (NO AUTH for now)
router.get('/stats', async (req, res) => {
  try {
    console.log('🔵 Fetching stats...');
    const totalUsers = await User.countDocuments();
    const farmers = await User.countDocuments({ role: 'farmer' });
    const experts = await User.countDocuments({ role: 'expert' });
    const publicUsers = await User.countDocuments({ role: 'public' });
    
    const stats = { totalUsers, farmers, experts, publicUsers };
    console.log(' Stats:', stats);
    res.json(stats);
  } catch (error) {
    console.error(' Stats error:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router;
