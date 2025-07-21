const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');

router.post('/update-profile', updateProfile);

module.exports = router;
