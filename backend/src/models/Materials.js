const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  semester: String,
  subject: String,
  fileUrl: String, // path to the uploaded file
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
