import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/password/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Password reset link sent to your email.');
      } else {
        setMessage(data.message || 'Failed to send password reset link.');
      }
    } catch {
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '1rem' }}>Forgot Password</h1>
        <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem' }}>Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
          />
          <button type="submit" style={{
            backgroundColor: '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            Send Reset Link
          </button>
        </form>
        {message && <p style={{ fontSize: '0.875rem', color: message.includes('sent') ? 'green' : 'red', marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
