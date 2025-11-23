const express = require('express');
const router = express.Router();
const { auth, expertAuth } = require('../middleware/auth');

// This is a simplified consultation system
const consultations = [];

// Get all consultations
router.get('/consultations', auth, expertAuth, async (req, res) => {
  try {
    res.json(consultations);
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add consultation response
router.post('/consultations/:id/respond', auth, expertAuth, async (req, res) => {
  try {
    const { response } = req.body;
    const consultation = consultations.find(c => c.id === req.params.id);
    
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    consultation.response = response;
    consultation.respondedBy = req.user.name;
    consultation.respondedAt = new Date();

    res.json(consultation);
  } catch (error) {
    console.error('Respond consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Request consultation (for farmers/public)
router.post('/consultations/request', auth, async (req, res) => {
  try {
    const { subject, description } = req.body;
    
    const newConsultation = {
      id: Date.now().toString(),
      userId: req.user._id,
      userName: req.user.name,
      subject,
      description,
      status: 'pending',
      createdAt: new Date(),
    };

    consultations.push(newConsultation);
    res.status(201).json(newConsultation);
  } catch (error) {
    console.error('Request consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;