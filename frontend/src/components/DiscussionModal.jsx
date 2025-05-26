import React, { useState } from 'react';
import './DiscussionModal.css'; // reuse the modal styles for consistency

const DiscussionModal = ({ onClose, onPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    postedBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPost(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Share Your Experience</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Enter title..."
            className="modal-input"
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Write your discussion..."
            className="modal-textarea"
            onChange={handleChange}
            required
          />
          <input
            name="postedBy"
            placeholder="Your name"
            className="modal-input"
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button class="upload-button" type="submit">Post</button>
            <button class="upload-button" onClick={onClose} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscussionModal;
