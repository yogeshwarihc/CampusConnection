import React from 'react';
import './ResourceCard.css'; // use same base style as ResourcesCard or PaperCard

const DiscussionCard = ({ discussion }) => {
  
  return (
    <div className="resource-card">
      <div className="left">
        <div className="icon">📘</div>
      </div>
      <div className="middle">
        <h3>{discussion.title}</h3>
        <p>{discussion.content}</p>
        <div className="info">
          <span>{discussion.postedBy}</span>
          <span>{new Date(discussion.uploadDate).toLocaleDateString()}</span>
           </div>
      </div>
      
    </div>
  );
};

export default DiscussionCard;
