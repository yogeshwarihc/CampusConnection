const express = require('express');
const multer = require('multer');
const path = require('path');
const Subject = require('../models/Subjects');
const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // save to /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const { subject, semester, year, examType, uploadedBy } = req.body;
  
      const newSubject = new Subject({
        subject,
        semester,
        year,
        examType,
        date: new Date(),
        fileSize: (req.file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadedBy,
        fileUrl: `/uploads/${req.file.filename}`,
      });
  
      await newSubject.save(); // ✅ Don't forget to save it to the DB
  
      res.status(201).json({ message: 'Material uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Upload failed' });
    }
  });
  

// Fetch all materials
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
});

module.exports = router;
