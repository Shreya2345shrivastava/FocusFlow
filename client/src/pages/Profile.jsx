import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('SSR');
  const [username,] = useState('Ssr123');
  const [email,] = useState('ssr@example.com');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');




  
  const [birthday, setBirthday] = useState('');
  const [summary, setSummary] = useState('');
  const [website, setWebsite] = useState('');

  const handleSaveChanges = async () => {
    const updatedProfile = {
      name,
      gender,
      location,
      birthday,
      summary,
      website,
    };

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={''} style={{ position: 'fixed', inset: 0, overflow: 'auto', background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)', minHeight: '100vh', minWidth: '100vw', fontFamily: 'Inter, Arial, sans-serif', color: '#1e293b' }}>
      <style>{`
        .profile-input::placeholder {
          color: #888 !important;
          opacity: 1 !important;
          font-weight: 500;
        }
        .profile-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #f1f5f9;
        }
        .profile-table tr:last-child td {
          border-bottom: none;
        }
        .profile-table label {
          font-weight: 500;
          color: #334155;
        }
        .profile-edit {
          color: #6366f1;
          cursor: pointer;
          font-size: 0.98rem;
          font-weight: 500;
        }
        .dark-mode {
          background: #1e293b;
          color: #f1f5f9;
        }
        .dark-mode .profile-table {
          background: #2a2e35;
          border-color: #444851;
        }
        .dark-mode .profile-table label {
          color: #f1f5f9;
        }
        .dark-mode .profile-input {
          background: #2a2e35;
          color: #f1f5f9;
          border: 1px solid #444851;
        }
        .dark-mode h1, .dark-mode h2 {
          color: #f1f5f9;
        }
        .dark-mode button {
          background: #6366f1;
          color: #fff;
        }
      `}</style>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10 }}>
        <Navbar />
      </div>
      <button
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/');
          }
        }}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'transparent',
          border: 'none',
          color: '#6366f1',
          cursor: 'pointer',
          fontSize: '1.5rem',
        }}
        aria-label="Go back"
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', width: '100vw', paddingTop: 60, background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)' }}>
        <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, width: '100%', marginBottom: 32 }}>
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128`} alt="avatar" style={{ width: 110, height: 110, borderRadius: '50%', boxShadow: '0 2px 12px rgba(99,102,241,0.15)', border: '4px solid #fff' }} />
            <div>
              <h1 style={{ color: '#1e293b', fontWeight: 700, fontSize: '2.1rem', marginBottom: 4 }}>{name}</h1>
              <div style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 2 }}>@{username}</div>
              <div style={{ color: '#6366f1', fontSize: '1rem' }}>{email}</div>
            </div>
          </div>
          <div style={{ width: '100%', maxWidth: 700, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', marginBottom: 32 }}>
            <h2 style={{ color: '#334155', fontWeight: 700, fontSize: '1.3rem', marginBottom: 18 }}>Basic Info</h2>
            <table className="profile-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.08rem' }}>
              <tbody>
                <tr>
                  <td><label>Name</label></td>
                  <td><input type="text" value={name} onChange={e => setName(e.target.value)} className="profile-input" placeholder="Your full name" style={{
  width: '100%',
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#9495e3ff',
  fontSize: '1rem',
  color: '#e0e7ff',
}} /></td>
                </tr>
                <tr>
                  <td><label>Gender</label></td>
                  <td>
                    <select value={gender} onChange={e => setGender(e.target.value)} className="profile-input" placeholder="Your Gender" style={{
  width: '100%',
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#9495e3ff',
  fontSize: '1rem',
  color: '#e0e7ff',
}}>
                      <option value="" disabled hidden>Choose gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label>Location</label></td>
                  <td><input type="text" value={location} onChange={e => setLocation(e.target.value)} className="profile-input" placeholder="Your city, state, country" style={{
  width: '100%',
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#9495e3ff',
  fontSize: '1rem',
  color: '#e0e7ff',
}} /></td>
                </tr>
                <tr>
                  <td><label>Birthday</label></td>
                  <td><input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} className="profile-input" placeholder="YYYY-MM-DD" style={{
  width: '100%',
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#9495e3ff',
  fontSize: '1rem',
  color: '#e0e7ff',
}} /></td>
                </tr>
                <tr>
                  <td><label>Summary</label></td>
                  <td><input type="text" value={summary} onChange={e => setSummary(e.target.value)} className="profile-input" placeholder="Your professional summary" style={{
  width: '100%',
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#9495e3ff',
  fontSize: '1rem',
  color: '#e0e7ff',
}} /></td>
                </tr>
                <tr>
                  <td><label>Website</label></td>
                  <td><input type="text" value={website} onChange={e => setWebsite(e.target.value)} className="profile-input" placeholder="Your blog, portfolio, etc." style={{
  width: '100%',
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#9495e3ff',
  fontSize: '1rem',
  color: '#e0e7ff',
}} /></td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleSaveChanges}
              style={{
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 18,
                boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
