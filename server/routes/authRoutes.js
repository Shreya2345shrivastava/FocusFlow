const express = require("express");
const router = express.Router();

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

router.post("/signup", validateAuth, signup);
router.post("/login", validateAuth, login);

module.exports = router;
