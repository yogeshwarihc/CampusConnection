import React from 'react';
import '../pages/Placement.css';

function PlacementCard({ title, description }) {
  return (
    <div className="placement-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default PlacementCard;