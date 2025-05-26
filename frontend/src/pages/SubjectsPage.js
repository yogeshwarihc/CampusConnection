import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UploadModal from '../components/UploadModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubjectCard from '../components/SubjectCard';
import './ResourcesPage.css';

const SubjectsPage = () => {
  const [subjects, setSubject] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSubject = async () => {
    try {
      const res = await api.get('/subjects');
      setSubject(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const handleUpload = async (formData) => {
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await api.post('/subjects/upload', data);
      setShowModal(false);
      fetchSubject();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  return (
    <div>
    <Navbar />
    <div className="resources-page">
      <div className="header">
        <h2>Placement Resources</h2>
        <button onClick={() => setShowModal(true)}>+ Upload Material</button>
      </div>
      <div className="resource-list">
        {subjects.map(subjects => (
          <SubjectCard key={subjects._id} subject={subjects} />
        ))}
      </div>
      {showModal && <UploadModal onClose={() => setShowModal(false)} onUpload={handleUpload} />}
    </div>
    <Footer />
    </div>
  );
};

export default SubjectsPage;
