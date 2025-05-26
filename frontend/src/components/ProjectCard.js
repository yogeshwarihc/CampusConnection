import React from 'react';
import '../pages/Project.css';

const ProjectCard = ({ project, onJoinClick }) => {
  const formattedDate = new Date(project.createdAt).toISOString().split('T')[0];

  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p className="posted-info">📅 Posted on {formattedDate} by {project.creator.name}</p>
      <p className="description">{project.description}</p>

      <div className="tech-tags">
        {project.technologies.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>

      <div className="card-footer">
        <div className="card-links">
        <a href={project.repositoryLink} target="_blank" rel="noreferrer">
  🔗 Repository
</a>
          <span>👥 {project.collaborators.length} Collaborator{project.collaborators.length !== 1 ? 's' : ''}</span>
        </div>
        <button className="join-button" onClick={() => onJoinClick(project._id)}>
          🤝 Request to Join ({project.joinRequests.length})
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
