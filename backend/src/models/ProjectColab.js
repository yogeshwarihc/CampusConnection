const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  repositoryLink: String,
  technologies: [String],
  creator: {
    name: String
  },
  collaborators: [{ name: String, email: String }],
  joinRequests: [{ name: String, email: String }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
