const express = require('express');
const router = express.Router();
const ingestionController = require('../controllers/ingestionController');

router.post('/upload', ingestionController.uploadFieldBundle);

module.exports = router;