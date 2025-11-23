const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema, 'feedback');

router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving feedback' });
  }
});
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
});


module.exports = router;