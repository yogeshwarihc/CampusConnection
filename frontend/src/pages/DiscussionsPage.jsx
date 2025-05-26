import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api/api';
import DiscussionCard from '../components/DiscussionCard';
import DiscussionModal from '../components/DiscussionModal';
import './DiscussionsPage.css'; 
import './ResourcesPage.css';// follows same style rules as other pages

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchDiscussions = async () => {
    try {
      const res = await api.get('/discussions');
      setDiscussions(res.data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  const handlePost = async (formData) => {
    try {
      await api.post('/discussions/create', formData);
      setShowModal(false);
      fetchDiscussions();
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="resources-page">
        <div className="header">
          <h2 >📚 Exam Discussions</h2>
          <button onClick={() => setShowModal(true)}>
            + Share Your Experience
          </button>
        </div>

        <div className="resource-list">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion._id} discussion={discussion} />
          ))}
        </div>

        {showModal && (
          <DiscussionModal onClose={() => setShowModal(false)} onPost={handlePost} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default DiscussionsPage;
