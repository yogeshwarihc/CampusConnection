const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Fetch all discussions
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ date: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discussions' });
  }
});

// Post a new discussion
router.post('/create', async (req, res) => {
  try {
    const { title, content, postedBy } = req.body;

    const experience = new Experience({
      title,
      content,
      postedBy
    });

    await experience.save();
    res.status(201).json({ message: 'Discussion posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to post discussion' });
  }
});

module.exports = router;
