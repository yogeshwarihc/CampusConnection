import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UploadModals from '../components/UploadModals';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaperCard from '../components/PaperCard';
import './PreviousPapers.css';

const PapersPage = () => {
  const [papers, setPaper] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPaper = async () => {
    try {
      const res = await api.get('/papers');
      setPaper(res.data);
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
      await api.post('/papers/upload', data);
      setShowModal(false);
      fetchPaper();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  useEffect(() => {
    fetchPaper();
  }, []);

  return (
    <div>
    <Navbar />
    <div className="papers-page">
      <div className="header">
        <h2>Previous Year Question papers</h2>
        <button onClick={() => setShowModal(true)}>+ Upload Material</button>
      </div>
      <div className="paper-list">
        {papers.map(paper => (
          <PaperCard key={paper._id} paper={paper} />
        ))}
      </div>
      {showModal && <UploadModals onClose={() => setShowModal(false)} onUpload={handleUpload} />}
    </div>
    <Footer />
    </div>
  );
};

export default PapersPage;
