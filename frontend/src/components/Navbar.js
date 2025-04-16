import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo"><Link to="/">Campus Connect</Link></h2>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/Register">SignUp</Link>
      </div>
    </nav>
  );
}

export default Navbar;
