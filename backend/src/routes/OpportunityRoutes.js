const express = require('express');
const router = express.Router();
const { createOpportunity, getOpportunities } = require('../controllers/OpportunityController');

router.post('/', createOpportunity);
router.get('/', getOpportunities);

module.exports = router;
