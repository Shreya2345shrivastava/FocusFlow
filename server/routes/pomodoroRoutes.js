const express = require("express");
const router = express.Router();


const { savePomodoro } = require("../controllers/pomodoroController");

// Input validation for saving pomodoro session
const validatePomodoro = (req, res, next) => {
  const { completedAt, duration } = req.body;
  if (!completedAt || !duration) {
    return res.status(400).json({ message: "completedAt and duration are required." });
  }
  next();
};

// If you want to require authentication:
// const requireAuth = require("../middleware/requireAuth");
// router.use(requireAuth);

router.post("/save", validatePomodoro, savePomodoro);

module.exports = router;
