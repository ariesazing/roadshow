import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { isAuthenticated, logout } from './services/authService';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLoginSuccess = (token) => {
    setAuthenticated(true);
    console.log('User logged in with token:', token);
    // You can redirect to dashboard or show main content here
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Main app content after authentication
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Dashboard</span>
          <button
            className="btn btn-outline-light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container">
        <h1>Welcome to the Dashboard</h1>
        <p>You are now logged in.</p>
      </div>
    </div>
  );
}

export default App;
