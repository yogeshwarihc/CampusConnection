import React, { useEffect, useState } from 'react';
import './Project.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectCollaboration = () => {
  const [projects, setProjects] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repo: '',
    tech: '',
  });
  const [techList, setTechList] = useState([]);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('❌ Failed to fetch projects:', error);
    }
  };

  // On component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Submit new project
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          repositoryLink: formData.repo,
          technologies: techList,
          creator: { name: 'Anonymous' },
          collaborators: [],
          joinRequests: [],
        }),
      });

      if (response.ok) {
        setFormData({ title: '', description: '', repo: '', tech: '' });
        setTechList([]);
        setFormVisible(false);
        fetchProjects(); // Refresh
      } else {
        const err = await response.json();
        console.error('⚠️ Server error:', err);
        alert('Failed to post project. Please check the console.');
      }
    } catch (err) {
      console.error('❌ Network error submitting project:', err);
      alert('Network error. Please try again.');
    }
  };

  // Add tech tag
  const handleTechAdd = () => {
    const trimmed = formData.tech.trim();
    if (trimmed && !techList.includes(trimmed)) {
      setTechList([...techList, trimmed]);
      setFormData({ ...formData, tech: '' });
    }
  };

  // Request to join a project
  const handleJoin = async (projectId) => {
    const name = "Your Name"; // Replace with logged-in user's name
    const email = "your.email@example.com"; // Replace with user's email

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        console.log('✅ Join request sent');
        fetchProjects(); // Optional: refresh to update join count
      } else {
        const errorText = await response.text();
        console.error('⚠️ Join request failed:', errorText);
      }
    } catch (err) {
      console.error('❌ Error joining project:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="project-container">
        <div className="header">
          <h1>Project Collaboration</h1>
          <p>Connect with peers and collaborate on exciting projects!</p>
        </div>

        <div className="projects-section">
          <div className="title-row">
            <h2>Active Projects</h2>
            <button className="toggle-form-btn" onClick={() => setFormVisible(!formVisible)}>
              {formVisible ? '− Close' : '+ Post Project'}
            </button>
          </div>

          {/* Form Section */}
          {formVisible && (
            <div className="form-card">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <textarea
                placeholder="Project Description"
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
              <input
                type="text"
                placeholder="GitHub Repository Link"
                value={formData.repo}
                onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
              />
              <div className="tech-input">
                <input
                  type="text"
                  placeholder="Add technology (e.g., React)"
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                />
                <button type="button" onClick={handleTechAdd}>Add</button>
              </div>
              <div className="tech-tags">
                {techList.map((tech, index) => (
                  <span key={index} className="tag">{tech}</span>
                ))}
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setFormVisible(false)}>Cancel</button>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          )}

          {/* Project Cards */}
          {projects.length === 0 ? (
            <p>No projects available yet. Be the first to post one!</p>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="meta">
                  <small>
                    Posted by {project.author?.name || 'Anonymous'} on{' '}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="footer">
                  <a href={project.repo} target="_blank" rel="noreferrer">🔗 View Repository</a>
                  <span>👥 {project.collaborators?.length || 0} Collaborator{(project.collaborators?.length !== 1) ? 's' : ''}</span>
                  <button className="join-btn" onClick={() => handleJoin(project._id)}>
                    🤝 Join ({project.joinRequests?.length || 0})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectCollaboration;
