const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  applyLink: { type: String },
  internshipDate: { type: String },
  postedBy: { type: String, required: true }, // Add postedBy field here
  postedDate: { type: Date, default: Date.now }, // You can also add a posted date
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
