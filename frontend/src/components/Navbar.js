import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); // or 'user' or whatever you use

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear login data
    navigate('/login'); // redirect to login page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Campus Connect</Link>
      <div className="nav-links">
        
      {isLoggedIn ? (
          <>
            <Link to="/academic">Academic</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
