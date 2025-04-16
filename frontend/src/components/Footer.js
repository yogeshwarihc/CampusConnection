import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Campus Connect</h4>
          <p>Empowering students with resources and connections for academic and placement success.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/placements">Placement Features</Link></li>
            <li><Link to="/academics">Academic Resources</Link></li>
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/forum">Forum</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: support@campusconnect.com</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Campus Connect. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
