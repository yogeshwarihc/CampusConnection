import React, { useState } from 'react';
import './UploadModal.css'; // create this CSS file

const UploadModal = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    semester: '',
    subject: '',
    file: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpload(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="upload-modal">
        <h3>Upload Material</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="description" placeholder="Description" onChange={handleChange} required />
          <input name="author" placeholder="Author" onChange={handleChange} required />
          <input name="semester" placeholder="Semester" onChange={handleChange} required />
          <input name="subject" placeholder="Subject" onChange={handleChange} required />
          <input type="file" name="file" onChange={handleChange} required />
          <button type="submit" >Upload</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
