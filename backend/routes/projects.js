const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project (requires JWT auth)
router.post('/create', projectController.createProject);

module.exports = router;