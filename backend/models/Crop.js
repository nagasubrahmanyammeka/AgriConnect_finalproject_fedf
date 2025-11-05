const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  optimalPH: {
    min: Number,
    max: Number,
  },
  optimalMoisture: {
    min: Number,
    max: Number,
  },
  season: {
    type: String,
  },
  description: {
    type: String,
  },
  techniques: [{
    type: String,
  }],
  recommendedPesticides: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

module.exports = mongoose.model('Crop', cropSchema);
