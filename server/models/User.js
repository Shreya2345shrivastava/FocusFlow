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
      return !this.googleId; // Password not required if signing up with Google
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
    unique: true,
    sparse: true // Allows multiple null values
  },
  avatar: {
    type: String
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
userSchema.statics.signup = async function(email, password, fullName) {
  if (!email || !password || !fullName) {
    throw Error('All fields are required');
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }
  
  const user = await this.create({ email, password, username: email.split('@')[0], fullName });
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