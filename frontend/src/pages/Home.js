import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

function Home() {
  const navigate = useNavigate();

  // Function to handle protected navigation
  const handleNavigation = (path) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <header className="hero-section">
        <h1>Connect, Learn, Succeed</h1>
        <p>
          A platform where juniors and seniors collaborate for academic excellence and placement success
        </p>
        <div className="hero-buttons">
          <button onClick={() => handleNavigation('/placements')}>Explore Placement Resources</button>
          <button onClick={() => handleNavigation('/academics')}>Browse Academic Materials</button>
        </div>
      </header>

      <section className="choose-path">
        <h2>Choose Your Path</h2>
        <div className="path-options">
          <div className="feature-link" onClick={() => handleNavigation('/placements')}>
            <FeatureCard
              title="Placement Track"
              description="Access materials, tips, and a network tailored for acing placements."
            />
          </div>
          <div className="feature-link" onClick={() => handleNavigation('/academics')}>
            <FeatureCard
              title="Academic Track"
              description="Dive into academic resources and collaborate on educational growth."
            />
          </div>
        </div>
      </section>

      <section className="why-connect">
        <h2>Why Campus Connect?</h2>
        <div className="features-grid">
          <FeatureCard
            title="Mentorship Network"
            description="Connect with seniors to gain insights into academics and placements."
          />
          <FeatureCard
            title="Skill Development"
            description="Participate in projects and develop technical and soft skills."
          />
          <FeatureCard
            title="Resource Sharing"
            description="Access curated resources shared by peers and alumni."
          />
        </div>
      </section>

      <section className="get-started">
        <h3>Ready to Get Started?</h3>
        <p>
          Join our community of students and alumni working together for better academic and career outcomes.
        </p>
        <div className="auth-buttons">
          <button onClick={() => navigate('/register')}>Create Account</button>
          <button onClick={() => navigate('/login')}>Log In</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
