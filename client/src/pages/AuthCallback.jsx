import React, { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const fetchUserProfile = useCallback(async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        login(token, userData);
        navigate('/dashboard');
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      alert('Authentication failed. Please try again.');
      navigate('/login');
    }
  }, [login, navigate]);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      alert('Google authentication failed. Please try again.');
      navigate('/login');
      return;
    }

    if (token) {
      // Fetch user data with the token
      fetchUserProfile(token);
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, fetchUserProfile]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)'
    }}>
      <div style={{
        padding: '2rem',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Authenticating with Google...</h2>
        <p>Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
