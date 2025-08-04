import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Journal from './pages/Journal';
import PomodoroPage from './pages/Pomodoro';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import AuthCallback from './pages/AuthCallback';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/journal" element={
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        } />
        <Route path="/pomodoro" element={
          <PrivateRoute>
            <PomodoroPage />
          </PrivateRoute>
        } />
        <Route path="/tasks" element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
