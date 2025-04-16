import React from 'react';
import '../pages/Placement.css';

function SuccessStoryCard({ initials, name, year, quote }) {
  return (
    <div className="success-card">
      <div className="success-card-header">
        <div className="avatar">{initials}</div>
        <div>
          <div className="success-card-name">{name}</div>
          <div className="success-card-year">{year}</div>
        </div>
      </div>
      <div className="success-card-quote">"{quote}"</div>
    </div>
  );
}

export default SuccessStoryCard;
