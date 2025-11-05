import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.username, formData.password, formData.role);

    if (!result.success || !result.user || result.user.role !== formData.role) {
      setError('Invalid credentials');
      return;
    }

    // Redirect based on role
    switch (formData.role) {
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
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="form-container" style={{ textAlign: 'left', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      {error && (
        <div
          className="alert-error"
          style={{
            color: 'red',
            marginBottom: '10px',
            fontWeight: 'bold',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <span>Username:</span>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '10px' }}>
          <span>Password:</span>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>

        {/* ---------- Aligned Radio Section ---------- */}
        <div className="role-select" style={{ marginTop: '20px' }}>
          <span
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Login As:
          </span>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              rowGap: '10px',
              columnGap: '10px',
            }}
          >
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
              required
            />
            <label style={{ whiteSpace: 'nowrap' }}>Admin</label>

            <input
              type="radio"
              name="role"
              value="farmer"
              checked={formData.role === 'farmer'}
              onChange={handleChange}
            />
            <label style={{ whiteSpace: 'nowrap' }}>Farmer</label>

            <input
              type="radio"
              name="role"
              value="expert"
              checked={formData.role === 'expert'}
              onChange={handleChange}
            />
            <label style={{ whiteSpace: 'nowrap' }}>Agriculture Expert</label>

            <input
              type="radio"
              name="role"
              value="public"
              checked={formData.role === 'public'}
              onChange={handleChange}
            />
            <label style={{ whiteSpace: 'nowrap' }}>Public</label>
          </div>
        </div>
        {/* ------------------------------------------- */}

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          LOGIN
        </button>
      </form>

      <div className="form-link" style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't Have an Account?{' '}
        <a href="/register" style={{ color: '#0d47a1', textDecoration: 'none' }}>
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
