const jwt = require('jsonwebtoken');

// Basic authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Expert-specific authentication middleware
const expertAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'expert') {
      return res.status(403).json({ message: 'Access denied. Expert role required.' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
};

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
};

// Farmer authentication middleware
const farmerAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'farmer') {
      return res.status(403).json({ message: 'Access denied. Farmer role required.' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
};

// CRITICAL: Export all middleware functions
module.exports = {
  auth,
  expertAuth,
  adminAuth,
  farmerAuth,
};
