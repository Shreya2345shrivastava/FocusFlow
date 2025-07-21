import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';


const PomodoroPage = () => {
  const [seconds, setSeconds] = useState(25 * 60); // 25 min default
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startTimer = () => {
    if (isActive) return;
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setSeconds(25 * 60);
  };

  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'linear-gradient(120deg, #2a4394ff 0%, #f8fafc 100%)', boxSizing: 'border-box', minHeight: '100vh', minWidth: '100vw', padding: 0, margin: 0 }}>
      <div style={{ position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10 }}>
        <Navbar />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
        <div style={{ maxWidth: 600, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#4f46e5', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>Pomodoro Timer</h2>
          <p style={{ color: '#334155', marginBottom: 24 }}>Boost your focus with the Pomodoro technique!</p>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: '#6366f1', marginBottom: 24 }}>{formatTime(seconds)}</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
          <button onClick={startTimer} disabled={isActive} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 500, cursor: isActive ? 'not-allowed' : 'pointer' }}>Start</button>
          <button onClick={pauseTimer} disabled={!isActive} style={{ background: '#f59e42', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 500, cursor: !isActive ? 'not-allowed' : 'pointer' }}>Pause</button>
          <button onClick={resetTimer} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }}>Reset</button>
        </div>
        <div style={{ color: '#64748b', fontSize: '1.1rem' }}>
          {seconds === 0 ? 'Session complete! Take a break.' : 'Stay focused!'}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PomodoroPage;
