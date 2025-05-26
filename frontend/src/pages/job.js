import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './job.css';

const Opportunities = () => {
  const [showForm, setShowForm] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    companyName: '',
    location: '',
    description: '',
    applyLink: '',
    internshipDate: '',
    internshipKnown: true,
    userName: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/opportunities')
      .then(res => res.json())
      .then(data => setOpportunities(data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, internshipKnown: !formData.internshipKnown, internshipDate: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { role, companyName, location, description, applyLink, internshipDate, internshipKnown, userName } = formData;

    const opportunityData = {
      role,
      companyName,
      location,
      description,
      applyLink,
      postedBy: userName,
      internshipDate: internshipKnown ? internshipDate : 'Not Known',
    };

    fetch('http://localhost:5000/api/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opportunityData),
    })
      .then(res => res.json())
      .then(data => {
        setOpportunities([data, ...opportunities]);
        setShowForm(false);
        setFormData({
          role: '',
          companyName: '',
          location: '',
          description: '',
          applyLink: '',
          internshipDate: '',
          internshipKnown: true,
          userName: '',
        });
      })
      .catch(err => console.log(err));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="opportunities-container">
        <div className="hero-section">
          <h1>Internship & Job Board</h1>
          <p>Discover opportunities shared by seniors & alumni or post new openings</p>
        </div>

        <div className="header">
          <h2>Latest Opportunities</h2>
          <button onClick={() => setShowForm(!showForm)} className="post-btn">+ Post Opportunity</button>
        </div>

        {showForm && (
          <form className="opportunity-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="userName" 
              placeholder="Your Name" 
              value={formData.userName} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="role" 
              placeholder="Position Title" 
              value={formData.role} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="companyName" 
              placeholder="Company Name" 
              value={formData.companyName} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="location" 
              placeholder="Location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              name="description" 
              placeholder="Description" 
              value={formData.description} 
              onChange={handleChange}
              required
            />
            <input 
              type="text" 
              name="applyLink" 
              placeholder="Link to Apply" 
              value={formData.applyLink} 
              onChange={handleChange} 
            />

            <div className="toggle-internship-date">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.internshipKnown} 
                  onChange={handleToggle} 
                />
                Internship Deadline Known?
              </label>
            </div>

            {formData.internshipKnown ? (
              <input 
                type="date" 
                name="internshipDate" 
                value={formData.internshipDate} 
                onChange={handleChange} 
                required 
              />
            ) : (
              <p>Deadline: Not Known</p>
            )}

            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        <div className="opportunity-list">
          {opportunities.length > 0 ? (
            opportunities.map((item, idx) => (
              <div key={idx} className="opportunity-card">
                <h3>{item.role}</h3>
                <div className="details">
                  <span>{item.companyName}</span>
                  <span>{item.location}</span>
                  <span>{item.internshipDate ? `Apply by ${item.internshipDate}` : 'No deadline set'}</span>
                  <span>Posted by: {item.postedBy}</span>
                  {item.postedDate && (
                    <span>Posted on: {formatDate(item.postedDate)}</span>
                  )}
                </div>
                <p>{item.description}</p>
                {item.applyLink && <a href={item.applyLink} target="_blank" rel="noopener noreferrer">Apply Here</a>}
              </div>
            ))
          ) : (
            <p>No opportunities posted yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Opportunities;