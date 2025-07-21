import '../App.css'; // Adjust the path depending on the file location
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, gender, birthday, location, summary }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || data.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', boxSizing: 'border-box', minHeight: '100vh', minWidth: '100vw', padding: 0, margin: 0 }}>
      <div className="auth-container" style={{ maxWidth: 400, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2 style={{ color: '#4f46e5', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Signup</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' }}
        >
          <option value="" disabled hidden>Choose Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          placeholder="Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem', resize: 'none', height: '100px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        <button type="submit" disabled={loading} style={{
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
    </div>
    </div>
  );
};

export default Signup;