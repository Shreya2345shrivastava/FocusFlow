const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required for Google OAuth users
    },
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  googleId: {
    type: String,
    sparse: true // Allow multiple docs without googleId but unique when present
  },
  gender: {
    type: String,
    required: function() {
      return !this.googleId; // Not required for Google OAuth users
    }
  },
  birthday: {
    type: Date,
    required: function() {
      return !this.googleId; // Not required for Google OAuth users
    }
  },
  location: {
    type: String,
    required: function() {
      return !this.googleId; // Not required for Google OAuth users
    },
    trim: true
  },
  summary: {
    type: String,
    required: function() {
      return !this.googleId; // Not required for Google OAuth users
    },
    trim: true
  }
}, { timestamps: true });

// Hash password before saving (best practice)
const bcrypt = require('bcryptjs');
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Add static signup and login methods
userSchema.statics.signup = async function(email, password, fullName, gender, birthday, location, summary) {
  if (!email || !password || !fullName || !gender || !birthday || !location || !summary) {
    throw Error('All fields are required');
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }
  
  const user = await this.create({ email, password, username: email.split('@')[0], fullName, gender, birthday, location, summary });
  return user;
};

userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('Email and password are required');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }
  return user;
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);