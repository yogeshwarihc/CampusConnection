const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  requestToJoin,
} = require('../controllers/projectController');

router.post('/', createProject);
router.get('/', getAllProjects);
router.post('/:projectId/join', requestToJoin);

module.exports = router;
