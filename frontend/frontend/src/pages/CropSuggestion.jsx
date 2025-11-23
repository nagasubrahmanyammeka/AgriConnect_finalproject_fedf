import React, { useState } from 'react';
import axios from 'axios';

const CropSuggestion = () => {
  const [formData, setFormData] = useState({
    ph: '',
    moisture: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuggestion('');
    setLoading(true);

    try {
      console.log('🔵 Requesting crop suggestion:', formData);

      const response = await axios.post('http://localhost:5000/api/suggestions', {
        ph: parseFloat(formData.ph),
        moisture: parseFloat(formData.moisture),
      });

      console.log('✅ Suggestion received:', response.data);

      setSuggestion(response.data.suggestion);
    } catch (err) {
      console.error('❌ Suggestion error:', err);
      setError('Failed to get crop suggestion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Get Crop Suggestion</h2>

      {error && (
        <div style={{
          color: '#d32f2f',
          marginBottom: '15px',
          padding: '12px',
          backgroundColor: '#ffebee',
          borderRadius: '6px',
          border: '1px solid #ef5350',
        }}>
          {error}
        </div>
      )}

      {suggestion && (
        <div style={{
          color: '#2e7d32',
          marginBottom: '15px',
          padding: '12px',
          backgroundColor: '#e8f5e9',
          borderRadius: '6px',
          border: '1px solid #4caf50',
          fontSize: '16px',
          fontWeight: '500',
        }}>
          {suggestion}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Soil pH Level:
          </label>
          <input
            type="number"
            step="0.1"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            placeholder="Enter pH level (e.g., 6.5)"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Soil Moisture (%):
          </label>
          <input
            type="number"
            step="1"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
            placeholder="Enter moisture percentage (e.g., 45)"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Getting Suggestion...' : 'Get Crop Suggestion'}
        </button>
      </form>
    </div>
  );
};

export default CropSuggestion;
