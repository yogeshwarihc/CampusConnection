const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  subject: String,
  semester: Number,
  year: Number,
  examType: String,
  uploadedBy: String,
  fileUrl: String,  // <--- IMPORTANT: Add this
}, { timestamps: true });

module.exports = mongoose.model('Paper', paperSchema);
