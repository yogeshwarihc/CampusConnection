// components/ResourceCard.js

import React from 'react';
import './ResourceCard.css';

const PaperCard = ({ paper }) => {
  
    const handleDownload = () => {
        const serverUrl = 'http://localhost:5000'; // or use process.env.REACT_APP_API_URL
        const fileUrl = `${serverUrl}${paper.fileUrl}`;
        console.log("Material object:", paper);
        console.log("fileUrl:", `${serverUrl}${paper.fileUrl}`);
        
        console.log("Trying to download:", fileUrl); // Should look like http://localhost:5000/uploads/myfile.pdf
      
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = paper.subject || "download";
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
        <h3>{paper.subject}</h3>
        <p>{paper.semester}</p>
        <div className="info">
          <span>{paper.year}</span>
          <span>{new Date(paper.uploadDate).toLocaleDateString()}</span>
          <span>{paper.UploadedBy} | {paper.subject}</span>
          <span>{(paper.sizeInBytes / (1024 * 1024)).toFixed(1)} MB</span>
        </div>
      </div>
      <div className="right">
        <button onClick={handleDownload}>⬇ Download</button>
      </div>
    </div>
  );
};

export default PaperCard;
