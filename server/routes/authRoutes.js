const express = require("express");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Make sure the path to authController is correct!
const { signup, login } = require("../controllers/authController.js");

console.log('🔧 AuthRoutes: Controllers imported:', typeof signup, typeof login);

// Input validation middleware
const validateAuth = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  next();
};

router.post("/signup", validateAuth, signup);
router.post("/login", validateAuth, login);

console.log('✅ AuthRoutes: /signup and /login routes defined');

// Google OAuth routes - only if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log('✅ Setting up Google OAuth routes');
  
  router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // Google OAuth callback
  router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      try {
        console.log('🔐 OAuth Callback - User ID:', req.user._id);
        
        // Generate JWT token for the user
        const token = jwt.sign(
          { userId: req.user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        console.log('✅ JWT Token generated successfully');
        
        // Redirect to frontend with token
        const frontendURL = process.env.CLIENT_URL || 'http://localhost:5173';
        res.redirect(`${frontendURL}/auth/callback?token=${token}`);
      } catch (error) {
        console.error('OAuth callback error:', error);
        const frontendURL = process.env.CLIENT_URL || 'http://localhost:5173';
        res.redirect(`${frontendURL}/login?error=auth_failed`);
      }
    }
  );
} else {
  console.log('⚠️  Google OAuth routes disabled - credentials not found');
}

module.exports = router;
