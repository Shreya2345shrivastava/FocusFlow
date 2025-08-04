const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Ensure environment variables are loaded
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth Profile:', profile.id, profile.emails[0].value);
    
    // Check if user already exists in our database
    let existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
      console.log('Found existing user:', existingUser.email);
      return done(null, existingUser);
    }
    
    // Check if user exists with the same email
    let userWithEmail = await User.findOne({ email: profile.emails[0].value });
    
    if (userWithEmail) {
      // Link Google account to existing user
      userWithEmail.googleId = profile.id;
      await userWithEmail.save();
      console.log('Linked Google account to existing user:', userWithEmail.email);
      return done(null, userWithEmail);
    }
    
    // Create new user
    const newUser = new User({
      googleId: profile.id,
      fullName: profile.displayName,
      username: profile.emails[0].value.split('@')[0], // Generate username from email
      email: profile.emails[0].value,
      avatar: profile.photos[0].value
    });
    
    await newUser.save();
    console.log('Created new user:', newUser.email);
    return done(null, newUser);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
