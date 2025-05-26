import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api/api';
import ExperienceCard from '../components/ExperienceCard';
import ExperienceModal from '../components/ExperienceModal';
import './DiscussionsPage.css'; 
import './ResourcesPage.css';// follows same style rules as other pages

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experiences');
      setExperiences(res.data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  const handlePost = async (formData) => {
    try {
      await api.post('/experiences/create', formData);
      setShowModal(false);
      fetchExperiences();
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <>
      <Navbar />
      <div className="resources-page">
        <div className="header">
          <h2 >📚 Interview Experiences</h2>
          <button onClick={() => setShowModal(true)}>
            + Share Your Experience
          </button>
        </div>

        <div className="resource-list">
          {experiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
        </div>

        {showModal && (
          <ExperienceModal onClose={() => setShowModal(false)} onPost={handlePost} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ExperiencesPage;
