const Opportunity = require('../models/Opportunity');

const createOpportunity = async (req, res) => {
  try {
    const { role, companyName, location, description, applyLink, internshipDate, postedBy } = req.body;

    if (!role || !companyName || !location || !description || !applyLink || !postedBy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const opportunity = new Opportunity({
      role,
      companyName,
      location,
      description,
      applyLink,
      postedBy,
      internshipDate: internshipDate || 'Not Known',
    });

    await opportunity.save();
    res.status(201).json(opportunity);

  } catch (error) {
    console.error("Error creating opportunity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate('postedBy', 'name')
      .sort({ postedDate: -1 });

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunities', error });
  }
};

// ✅ Correct single export
module.exports = {
  createOpportunity,
  
  getOpportunities
};
