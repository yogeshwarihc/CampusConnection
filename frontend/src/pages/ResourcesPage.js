import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UploadModal from '../components/UploadModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import './ResourcesPage.css';

const ResourcesPage = () => {
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMaterials = async () => {
    try {
      const res = await api.get('/resources');
      setMaterials(res.data);
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
      await api.post('/resources/upload', data);
      setShowModal(false);
      fetchMaterials();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div>
    <Navbar />
    <div className="resources-page">
      <div className="header">
        <h2>Academic Resources</h2>
        <button onClick={() => setShowModal(true)}>+ Upload Material</button>
      </div>
      <div className="resource-list">
        {materials.map(material => (
          <ResourceCard key={material._id} material={material} />
        ))}
      </div>
      {showModal && <UploadModal onClose={() => setShowModal(false)} onUpload={handleUpload} />}
    </div>
    <Footer />
    </div>
  );
};

export default ResourcesPage;
