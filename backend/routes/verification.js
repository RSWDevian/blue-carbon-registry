const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// Approve or reject an MRV job
router.post('/verify', verificationController.verifyMRVJob);

module.exports = router;