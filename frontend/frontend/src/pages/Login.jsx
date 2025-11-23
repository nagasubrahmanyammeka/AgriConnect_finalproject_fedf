import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '',        // Changed from email to name
    password: '', 
    role: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Pass name, not email
      const result = await login(formData.name, formData.password, formData.role);

      if (!result.success) {
        setError(result.message || 'Invalid credentials');
        setLoading(false);
        return;
      }

      // Navigate based on role
      const userRole = result.user.role;
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'farmer':
          navigate('/farmer');
          break;
        case 'expert':
          navigate('/expert');
          break;
        case 'public':
          navigate('/public');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container" style={{ textAlign: 'left', maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login to AgriConnect</h2>
      
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

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Username:
          </label>
          <input
            name="name"         // Changed here
            type="text"         // Changed here
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your username"  // Changed here
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
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
            Login As:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            rowGap: '12px',
            columnGap: '10px',
          }}>
            <input type="radio" id="admin" name="role" value="admin" 
              checked={formData.role === 'admin'} onChange={handleChange} required />
            <label htmlFor="admin">Admin</label>
            <input type="radio" id="farmer" name="role" value="farmer" 
              checked={formData.role === 'farmer'} onChange={handleChange} />
            <label htmlFor="farmer">Farmer</label>
            <input type="radio" id="expert" name="role" value="expert" 
              checked={formData.role === 'expert'} onChange={handleChange} />
            <label htmlFor="expert">Agriculture Expert</label>
            <input type="radio" id="public" name="role" value="public" 
              checked={formData.role === 'public'} onChange={handleChange} />
            <label htmlFor="public">Public</label>
          </div>
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
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: '#2e7d32', textDecoration: 'none', fontWeight: '500' }}>
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
