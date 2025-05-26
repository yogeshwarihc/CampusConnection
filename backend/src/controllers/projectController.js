const Project = require('../models/ProjectColab');

// POST new project
exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST join project
exports.requestToJoin = async (req, res) => {
  const { projectId } = req.params;
  const { name, email } = req.body;

  try {
    const project = await Project.findById(projectId);
    project.collaborators.push({ name, email });
    await project.save();
    res.json({ message: 'Request to join sent', project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
