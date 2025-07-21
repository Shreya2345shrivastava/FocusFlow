const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to create a JWT token
// Helper to create a JWT token
const createToken = (_id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};


// POST /signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };
