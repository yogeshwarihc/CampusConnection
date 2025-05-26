import React from 'react';
import './ResourceCard.css'; // use same base style as ResourcesCard or PaperCard

const ExperienceCard = ({ experience }) => {
  
  return (
    <div className="resource-card">
      <div className="left">
        <div className="icon">📘</div>
      </div>
      <div className="middle">
        <h3>{experience.title}</h3>
        <p>{experience.content}</p>
        <div className="info">
          <span>{experience.postedBy}</span>
          <span>{new Date(experience.uploadDate).toLocaleDateString()}</span>
           </div>
      </div>
      
    </div>
  );
};

export default ExperienceCard;
