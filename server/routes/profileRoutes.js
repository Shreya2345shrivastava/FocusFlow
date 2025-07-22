const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');

// Protected routes - require authentication
router.get('/profile', requireAuth, getProfile);
router.post('/update-profile', requireAuth, updateProfile);

module.exports = router;
