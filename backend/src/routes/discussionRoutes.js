const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');

// Fetch all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ date: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discussions' });
  }
});

// Post a new discussion
router.post('/create', async (req, res) => {
  try {
    const { title, content, postedBy } = req.body;

    const discussion = new Discussion({
      title,
      content,
      postedBy
    });

    await discussion.save();
    res.status(201).json({ message: 'Discussion posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to post discussion' });
  }
});

module.exports = router;
