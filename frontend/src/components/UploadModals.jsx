import React, { useState } from 'react';
import './UploadModals.css'; // create this CSS file

const UploadModals = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    subject: '',
    semester: '',
    year: '',
    examType: '',
    uploadedBy: '',
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
          <input name="subject" placeholder="Enter subject name" onChange={handleChange} required />
          <input name="semester" placeholder="semester" onChange={handleChange} required />
          <input name="year" placeholder="year" onChange={handleChange} required />
          <input name="examType" placeholder="examType" onChange={handleChange} required />
          <input name="uploadedBy" placeholder="Uploaded by" onChange={handleChange} required />
          <input type="file" name="file" onChange={handleChange} required />
          <button type="submit" >Upload</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UploadModals;
