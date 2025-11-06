const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get user by ID (MUST use auth middleware)
router.get('/:id', auth, async (req, res) => {
  try {
    console.log('Request user:', req.user); // Debug: Check if req.user is populated
    console.log('Requested ID:', req.params.id);
    
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
