import '../App.css'; // Adjust the path if needed
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <div style={{ display: 'flex', height: '90vh', width: '90vw', overflow: 'hidden', background: 'linear-gradient(to right, #394bb7ff, #d8dae5ff)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
      <style>{`body { overflow: hidden; padding: 0; }`}</style>
      {/* Left - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: '20px', margin: '20px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: 500, width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#394bb7ff', marginBottom: '1rem', textAlign: 'center' }}>
            {isSignup ? 'Create an account' : 'Welcome back'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem', textAlign: 'center' }}>
            {isSignup ? 'Please enter your details to sign up.' : 'Please enter your details to log in.'}
          </p>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
            />
            {!isSignup && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                <label>
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} /> Remember for 30 days
                </label>
                <a href="#" onClick={handleForgotPassword} style={{ color: '#4f46e5', textDecoration: 'none' }}>Forgot password?</a>
              </div>
            )}
            <button type="submit" disabled={loading} style={{
              backgroundColor: '#394bb7ff',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}>
              {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign up' : 'Sign in')}
            </button>
            <button type="button" onClick={handleGoogleLogin} style={{
              backgroundColor: '#db4437',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}>
              Sign in with Google
            </button>
          </form>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem', textAlign: 'center' }}>
            {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <button type="button" onClick={() => setIsSignup(!isSignup)} style={{
              background: 'none',
              border: 'none',
              color: '#4f46e5',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>

      {/* Right - Illustration */}
      <div style={{ flex: 1, backgroundColor: '#5460a6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', margin: '20px', boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.1)' }}>
        <img
          src="https://img.freepik.com/premium-vector/tablet-login-concept-illustration_114360-7963.jpg?semt=ais_hybrid&w=740"
          alt="Authentication Illustration"
          style={{ maxWidth: '100%', height: '95%', objectFit: 'contain', margin: 'auto', borderRadius: '20px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
        />
      </div>
    </div>
  );
};

export default LoginSignup;   