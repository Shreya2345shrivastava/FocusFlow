import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  // ...existing code...

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'linear-gradient(120deg, #0e2777ff 0%, #f8fafc 100%)', boxSizing: 'border-box', minHeight: '100vh', minWidth: '100vw', padding: 0, margin: 0 }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
        <Navbar />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
        <div className="dashboard-container" style={{ maxWidth: 1000, width: '100%', padding: '2rem', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', boxSizing: 'border-box' }}>
        <h1 style={{ color: '#4f46e5', fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', letterSpacing: 1 }}>Welcome to FocusFlow ✨</h1>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.2rem', marginBottom: '2.5rem' }}>
          Your productivity hub: track tasks, journal your thoughts, and stay focused with Pomodoro.
        </p>
        <div className="main-section" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: 280, background: '#f1f5f9', borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 2px 12px rgba(79,70,229,0.08)' }}>
            <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.3rem', marginBottom: 12 }}>Journals</h2>
            <p style={{ color: '#334155', marginBottom: 16 }}>Reflect and record your daily thoughts.</p>
            <a href="/journal" style={{ color: '#fff', background: '#6366f1', padding: '8px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 500 }}>Go to Journals</a>
          </div>
          <div style={{ flex: 1, minWidth: 280, background: '#f1f5f9', borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 2px 12px rgba(79,70,229,0.08)' }}>
            <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.3rem', marginBottom: 12 }}>Tasks</h2>
            <p style={{ color: '#334155', marginBottom: 16 }}>Organize and manage your to-dos.</p>
            <a href="/tasks" style={{ color: '#fff', background: '#6366f1', padding: '8px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 500 }}>Go to Tasks</a>
          </div>
          <div style={{ flex: 1, minWidth: 280, background: '#f1f5f9', borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 2px 12px rgba(79,70,229,0.08)' }}>
            <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.3rem', marginBottom: 12 }}>Pomodoro</h2>
            <p style={{ color: '#334155', marginBottom: 16 }}>Boost focus with timed sessions.</p>
            <a href="/pomodoro" style={{ color: '#fff', background: '#6366f1', padding: '8px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 500 }}>Go to Pomodoro</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
