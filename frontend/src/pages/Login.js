import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const { token, user } = response.data;

      // Store token and optionally user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to home/dashboard
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-card">
          <h2>Log In to Campus Connect</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">College Email</label>
            <input
              type="email"
              id="email"
              placeholder="2022is_JonDoe_d@nie.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="email-format">
              Format: admittedyearbranchname_fullname_section@nie.ac.in
            </p>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Log In</button>
          </form>

          <p className="signup-text">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
