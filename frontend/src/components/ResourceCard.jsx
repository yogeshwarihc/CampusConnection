// components/ResourceCard.js

import React from 'react';
import './ResourceCard.css';

const ResourceCard = ({ material }) => {
  
    const handleDownload = () => {
        const serverUrl = 'http://localhost:5000'; // or use process.env.REACT_APP_API_URL
        const fileUrl = `${serverUrl}${material.fileUrl}`;
        console.log("Material object:", material);
        console.log("fileUrl:", `${serverUrl}${material.fileUrl}`);
        
        console.log("Trying to download:", fileUrl); // Should look like http://localhost:5000/uploads/myfile.pdf
      
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = material.title || "download";
        link.target = '_blank'; // <- Helps avoid browser blocking
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      
  

  return (
    <div className="resource-card">
      <div className="left">
        <div className="icon">📘</div>
      </div>
      <div className="middle">
        <h3>{material.title}</h3>
        <p>{material.description}</p>
        <div className="info">
          <span>{material.author}</span>
          <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
          <span>{material.semester} | {material.subject}</span>
          <span>{(material.sizeInBytes / (1024 * 1024)).toFixed(1)} MB</span>
        </div>
      </div>
      <div className="right">
        <button onClick={handleDownload}>⬇ Download</button>
      </div>
    </div>
  );
};

export default ResourceCard;
