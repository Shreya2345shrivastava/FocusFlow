const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Only configure Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log('✅ Configuring Google OAuth strategy');
  
  // Configure Google OAuth strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google OAuth Profile:', {
        id: profile.id,
        email: profile.emails[0]?.value,
        name: profile.displayName
      });

      // Check if user already exists
      let user = await User.findOne({ 
        $or: [
          { googleId: profile.id },
          { email: profile.emails[0]?.value }
        ]
      });

      if (user) {
        // Update Google ID if user exists but doesn't have one
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }
        console.log('Existing user found:', user.email);
        return done(null, user);
      } else {
        // Create new user
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0]?.value,
          fullName: profile.displayName,
          password: 'google-oauth' // Placeholder password for Google users
        });

        await newUser.save();
        console.log('New user created:', newUser.email);
        return done(null, newUser);
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, null);
    }
  }));

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
} else {
  console.log('⚠️  Google OAuth credentials not found - Google sign-in disabled');
}

module.exports = passport;