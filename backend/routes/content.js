const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // save files here
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const contentSchema = new mongoose.Schema({
  description: String,
  author: String,
  originalname: String,
  filename: String,
  filetype: String,
  filepath: String,
  uploadedAt: { type: Date, default: Date.now }
});

// This ensures Mongo stores it in the "content" collection!
const Content = mongoose.model('Content', contentSchema, 'content');

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const { description, author } = req.body;
    const content = new Content({
      description,
      author,
      originalname: req.file.originalname,
      filename: req.file.filename,
      filetype: req.file.mimetype,
      filepath: req.file.path,
    });
    await content.save();
    res.status(201).json({ message: 'Content saved', content });
  } catch (error) {
    res.status(500).json({ message: 'Error saving content', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const contents = await Content.find().sort({ uploadedAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

module.exports = router;
