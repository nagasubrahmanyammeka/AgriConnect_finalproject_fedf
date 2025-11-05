import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const CropSuggestion = () => {
  const [formData, setFormData] = useState({
    ph: '',
    moisture: '',
    season: 'summer',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/farmer/crop-suggestion`, {
        ph: parseFloat(formData.ph),
        moisture: parseFloat(formData.moisture),
        season: formData.season,
      });
      
      setSuggestions(response.data);
    } catch (error) {
      alert('Error fetching crop suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Crop Suggestion System</h1>
        <p className="page-subtitle">
          Get personalized crop recommendations based on your soil conditions
        </p>
        
        <div className="card">
          <div className="card__body">
            <h2>Enter Soil Parameters</h2>
            <form onSubmit={handleSubmit} className="crop-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ph" className="form-label">Soil pH Level</label>
                  <input
                    type="number"
                    id="ph"
                    name="ph"
                    className="form-control"
                    placeholder="e.g., 6.5"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.ph}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="moisture" className="form-label">Soil Moisture (%)</label>
                  <input
                    type="number"
                    id="moisture"
                    name="moisture"
                    className="form-control"
                    placeholder="e.g., 40"
                    step="1"
                    min="0"
                    max="100"
                    value={formData.moisture}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="season" className="form-label">Season</label>
                  <select
                    id="season"
                    name="season"
                    className="form-control"
                    value={formData.season}
                    onChange={handleChange}
                  >
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                    <option value="monsoon">Monsoon</option>
                    <option value="spring">Spring</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn--primary"
                disabled={loading}
              >
                {loading ? 'Finding Suggestions...' : 'Get Suggestions'}
              </button>
            </form>
          </div>
        </div>
        
        {suggestions.length > 0 && (
          <div className="card">
            <div className="card__body">
              <h2>Recommended Crops</h2>
              <div className="crops-grid">
                {suggestions.map((crop) => (
                  <div key={crop._id} className="crop-card">
                    <h3>{crop.name}</h3>
                    <p>{crop.description}</p>
                    
                    <div className="crop-details">
                      <div className="crop-detail-item">
                        <strong>Optimal pH:</strong> {crop.optimalPH.min} - {crop.optimalPH.max}
                      </div>
                      <div className="crop-detail-item">
                        <strong>Moisture:</strong> {crop.optimalMoisture.min}% - {crop.optimalMoisture.max}%
                      </div>
                      <div className="crop-detail-item">
                        <strong>Season:</strong> {crop.season}
                      </div>
                    </div>
                    
                    {crop.techniques && crop.techniques.length > 0 && (
                      <div className="crop-techniques">
                        <strong>Techniques:</strong>
                        <ul>
                          {crop.techniques.map((technique, index) => (
                            <li key={index}>{technique}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {suggestions.length === 0 && !loading && formData.ph && (
          <div className="card">
            <div className="card__body">
              <p className="empty-state">
                No crop suggestions found for the given parameters. Try adjusting the values.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropSuggestion;
