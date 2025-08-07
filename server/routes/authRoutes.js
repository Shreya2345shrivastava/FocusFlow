const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Make sure the path to authController is correct!
const { signup, login } = require("../controllers/authController.js");

// Input validation middleware
const validateAuth = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  next();
};

// Regular auth routes
router.post("/signup", validateAuth, signup);
router.post("/login", validateAuth, login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { _id: req.user._id, id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      console.log('Google OAuth successful, redirecting with token');
      
      // Determine redirect URL based on environment
      const frontendURL = process.env.NODE_ENV === 'production' 
        ? 'https://focus-flow-kohl.vercel.app' 
        : 'http://localhost:5174';

      // Redirect to frontend with token
      res.redirect(`${frontendURL}/auth/google/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: req.user._id,
        email: req.user.email,
        fullName: req.user.fullName
      }))}`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      const frontendURL = process.env.NODE_ENV === 'production' 
        ? 'https://focus-flow-kohl.vercel.app' 
        : 'http://localhost:5174';
      res.redirect(`${frontendURL}/login?error=oauth_failed`);
    }
  }
);

module.exports = router;
