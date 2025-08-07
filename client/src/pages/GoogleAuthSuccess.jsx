import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current) return;
    
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const userStr = urlParams.get('user');

    console.log('Google OAuth Success - Token:', !!token);

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        console.log('Google OAuth Success - User:', user);
        
        // Mark as processed before calling login
        hasProcessed.current = true;
        
        // Use the AuthContext login function
        login(token, user);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login?error=auth_failed');
      }
    } else {
      console.error('Missing token or user data');
      navigate('/login?error=auth_failed');
    }
  }, [location.search, login, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Completing Google Sign-In...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
