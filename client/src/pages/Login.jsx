import '../App.css'; // Adjust the path if needed
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  // Use the correct URL construction to avoid double /api/
  const baseURL = import.meta.env.VITE_API_URL;
  const endpoint = isSignup ? 'signup' : 'login';
  const fullURL = `${baseURL}/api/user/${endpoint}`;
  
  console.log('=== DEBUG INFO ===');
  console.log('Base URL:', baseURL);
  console.log('Endpoint:', endpoint);  
  console.log('Full URL:', fullURL);
  console.log('==================');
  
  try {
    const res = await fetch(fullURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    console.log('Response received:', { status: res.status, data });
    
    if (res.ok) {
      if (!isSignup) {
        login(data.token, { email: data.email, id: data.id });
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Account created successfully! Please log in.');
        setIsSignup(false);
      }
    } else {
      console.error('Authentication failed:', data);
      alert(data.error || data.message || 'Authentication failed');
    }
  } catch (error) {
    console.error('Network error:', error);
    alert(`Network error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <>
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      
      <div style={{
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#6a5acd',
            marginBottom: '1rem'
          }}>
            FocusFlow
          </div>
          
          {/* Title */}
          <h2 style={{
            marginBottom: '1.5rem',
            color: '#333',
            fontSize: '1.5rem'
          }}>
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>

          {/* Form */}
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '10px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                margin: '0.5rem 0',
                borderRadius: '10px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            
            {/* Remember me and Forgot password for login */}
            {!isSignup && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                fontSize: '0.875rem', 
                color: '#6b7280',
                margin: '0.5rem 0'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} /> Remember me
                </label>
                <a 
                  href="#" 
                  onClick={handleForgotPassword} 
                  style={{ 
                    color: '#6a5acd', 
                    textDecoration: 'none',
                    fontSize: '0.8rem'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Login/Signup Button */}
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: loading ? '#ccc' : '#6a5acd',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s ease',
                marginTop: '1rem'
              }}
              onMouseOver={(e) => {
                if (!loading) e.target.style.background = '#5a4bbd';
              }}
              onMouseOut={(e) => {
                if (!loading) e.target.style.background = '#6a5acd';
              }}
            >
              {loading ? (isSignup ? 'Creating Account...' : 'Logging in...') : (isSignup ? 'Create Account' : 'Login')}
            </button>

            {/* Google Sign-in Button */}
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: '#db4437',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => e.target.style.background = '#c23321'}
              onMouseOut={(e) => e.target.style.background = '#db4437'}
            >
              <span style={{ fontSize: '1.2rem' }}>G</span>
              Sign in with Google
            </button>
          </form>

          {/* Links */}
          <div style={{
            marginTop: '1rem',
            fontSize: '0.9rem'
          }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6a5acd',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontFamily: 'inherit'
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              {isSignup ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;   
