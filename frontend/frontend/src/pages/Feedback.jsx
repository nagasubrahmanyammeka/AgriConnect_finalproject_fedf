import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      setSuccess('Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <fieldset
        style={{
          width: '120%',
          maxWidth: '490px',
          padding: '25px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          border: '2px solid #ddd',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Submit Feedback
        </h2>

        {error && (
          <div
            style={{
              color: '#d32f2f',
              marginBottom: '15px',
              padding: '12px',
              backgroundColor: '#ffebee',
              borderRadius: '6px',
              border: '1px solid #ef5350',
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              color: '#2e7d32',
              marginBottom: '15px',
              padding: '12px',
              backgroundColor: '#e8f5e9',
              borderRadius: '6px',
              border: '1px solid #4caf50',
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Message:
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your feedback message"
              required
              rows="5"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: loading ? '#ccc' : '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default Feedback;
