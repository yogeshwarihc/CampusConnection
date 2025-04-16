import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    usn: '',
    admittedYear: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, usn, admittedYear, password, confirmPassword } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, usn, admittedYear, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Join all backend error messages into one string
          const errorMessages = Object.values(data.errors).join(' ');
          setError(errorMessages);
        } else {
          setError(data.message || 'Registration failed.');
        }
        return;
      }

      // Registration successful
      alert('Registered successfully! Redirecting to login.');
      navigate('/login');

    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <div className="register-card">
          <h2>Create Your Account</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">College Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. 2022cs_joedoe_b@nie.ac.in"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <p className="email-format">
              Format: admittedyear + 2-letter branch + name + section@nie.ac.in
            </p>

            <label htmlFor="admittedYear">Admitted Year</label>
            <input
              type="text"
              id="admittedYear"
              name="admittedYear"
              placeholder="2022"
              value={formData.admittedYear}
              onChange={handleChange}
              required
            />

            <label htmlFor="usn">USN (University Seat Number)</label>
            <input
              type="text"
              id="usn"
              name="usn"
              placeholder="e.g. 4NI22CS045"
              value={formData.usn}
              onChange={handleChange}
              required
            />
            <p className="email-format">
              Format: 4NI + last 2 digits of admitted year + branch + 3-digit number
            </p>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Create Account</button>
          </form>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
