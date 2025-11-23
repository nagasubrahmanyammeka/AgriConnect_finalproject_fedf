const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');                    // ✅ ADDED
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect database
connectDB();

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder (moved before routes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register ALL routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/guidance', require('./routes/guidance'));
app.use('/api/suggestions', require('./routes/suggestions'));    // ✅ ADDED
app.use('/api/content', require('./routes/content'));            // ✅ ADDED
app.use('/api/admin', require('./routes/admin'));
app.use('/api/farmer', require('./routes/farmer'));
app.use('/api/expert', require('./routes/expert'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
