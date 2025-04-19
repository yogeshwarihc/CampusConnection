const express = require('express');
const multer = require('multer');
const path = require('path');
const Material = require('../models/Materials');
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
    const { title, description, author, semester, subject } = req.body;
    const newMaterial = new Material({
      title,
      description,
      author,
      semester,
      subject,
       fileUrl: `/uploads/${req.file.filename}`,

    });
    await newMaterial.save();
    res.status(201).json({ message: 'Material uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Fetch all materials
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
});

module.exports = router;
