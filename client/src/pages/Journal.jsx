import '../App.css'; // Adjust the path depending on the file location
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';


const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJournals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/journals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) setJournals(data);
      else setError(data.message || 'Failed to fetch journals');
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };


  const addJournal = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !newEntry.trim()) {
      setError('Title and content are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: title.trim(), content: newEntry.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewEntry('');
        setTitle('');
        fetchJournals();
      } else {
        setError(data.message || data.error || 'Failed to add journal entry');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const deleteJournal = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/journals/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        fetchJournals();
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to delete journal entry');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'linear-gradient(120deg, #1a3488ff 0%, #f8fafc 100%)', boxSizing: 'border-box', minHeight: '100vh', minWidth: '100vw', padding: 0, margin: 0 }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10 }}>
        <Navbar />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
        <div className="journal-container" style={{ maxWidth: 600, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
          <h2 style={{ color: '#4f46e5', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Journal 📝</h2>
          <form onSubmit={addJournal} style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: 15,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
              }}
            />
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write your thoughts..."
              required
              style={{
                width: '100%',
                minHeight: 80,
                padding: '0.75rem',
                borderRadius: 8,
                border: '2px solid #cbd5e1',
                fontSize: '1rem',
                marginBottom: 12,
              }}
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
              {loading ? 'Adding...' : 'Add Entry'}
            </button>
          </form>
          {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
          <div className="journal-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {loading && journals.length === 0 ? (
              <div>Loading...</div>
            ) : journals.length === 0 ? (
              <div style={{ color: '#64748b' }}>No journal entries yet.</div>
            ) : (
              journals.map((entry) => (
                <div key={entry._id} className="journal-entry" style={{ background: '#f1f5f9', borderRadius: 12, padding: 18 }}>
                  <h4 style={{ margin: 0, color: '#334155', fontWeight: 600 }}>{entry.title}</h4>
                  <p style={{ margin: '8px 0 0 0', color: '#334155' }}>{entry.content}</p>
                  <small style={{ color: '#64748b' }}>{new Date(entry.createdAt).toLocaleString()}</small>
                  <span onClick={() => deleteJournal(entry._id)} style={{
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginTop: 8,
                  }}>
                    🗑️
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
