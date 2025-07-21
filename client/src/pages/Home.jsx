import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
    minHeight: '100vh',
    minWidth: '100vw',
    padding: '1rem',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '3rem 2rem',
    textAlign: 'center',
    width: '100%',
    maxWidth: '480px',
    animation: 'fadeIn 0.8s ease-in-out',
  };

  const headingStyle = {
    color: '#4f46e5',
    fontWeight: '700',
    fontSize: '2.2rem',
    marginBottom: '1rem',
  };

  const subheadingStyle = {
    color: '#334155',
    marginBottom: '2rem',
    fontSize: '1rem',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1.2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const primaryButtonStyle = {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)',
  };

  const secondaryButtonStyle = {
    background: '#ffffff',
    color: '#6366f1',
    border: '2px solid #6366f1',
    borderRadius: '0.5rem',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 10px rgba(99, 102, 241, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Welcome to FocusFlow 🌱</h1>
        <p style={subheadingStyle}>Your personal Pomodoro timer and productivity journal app.</p>
        <div style={buttonGroupStyle}>
          <Link to="/signup">
            <button
              style={primaryButtonStyle}
              onMouseEnter={e => (e.target.style.background = '#4f46e5')}
              onMouseLeave={e => (e.target.style.background = '#6366f1')}
            >
              Create Account
            </button>
          </Link>
          <Link to="/login">
            <button
              style={secondaryButtonStyle}
              onMouseEnter={e => {
                e.target.style.background = '#f0f0ff';
                e.target.style.color = '#4f46e5';
              }}
              onMouseLeave={e => {
                e.target.style.background = '#fff';
                e.target.style.color = '#6366f1';
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
