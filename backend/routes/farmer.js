const express = require('express');
const router = express.Router();
const axios = require('axios');
const Crop = require('../models/Crop');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

// Get crop suggestions based on soil data
router.post('/crop-suggestion', auth, async (req, res) => {
  try {
    const { ph, moisture, season } = req.body;

    const crops = await Crop.find({
      'optimalPH.min': { $lte: ph },
      'optimalPH.max': { $gte: ph },
      'optimalMoisture.min': { $lte: moisture },
      'optimalMoisture.max': { $gte: moisture },
    }).populate('recommendedPesticides');

    res.json(crops);
  } catch (error) {
    console.error('Crop suggestion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weather data
router.get('/weather/:location', auth, async (req, res) => {
  try {
    const { location } = req.params;
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: 'Weather API key not configured' });
    }
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ message: 'Unable to fetch weather data' });
  }
});

// Get all products
router.get('/products', auth, async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get farming techniques
router.get('/techniques', auth, async (req, res) => {
  try {
    const techniques = [
      {
        id: 1,
        title: 'Drip Irrigation',
        description: 'Water-saving irrigation technique that delivers water directly to plant roots',
        benefits: ['Water conservation', 'Reduced weed growth', 'Lower labor costs'],
      },
      {
        id: 2,
        title: 'Crop Rotation',
        description: 'Practice of growing different types of crops in the same area across seasons',
        benefits: ['Soil health improvement', 'Pest control', 'Better yields'],
      },
      {
        id: 3,
        title: 'Precision Agriculture',
        description: 'Use of technology to optimize crop yields and reduce waste',
        benefits: ['Data-driven decisions', 'Resource optimization', 'Increased productivity'],
      },
    ];
    
    res.json(techniques);
  } catch (error) {
    console.error('Get techniques error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
