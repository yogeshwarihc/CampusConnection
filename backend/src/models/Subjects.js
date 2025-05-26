const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subject: String,
  semester: Number,
  year: Number,
  examType: String,
  uploadedBy: String,
  fileUrl: String,  // <--- IMPORTANT: Add this
}, { timestamps: true });

module.exports = mongoose.model('Subjects', subjectSchema);
