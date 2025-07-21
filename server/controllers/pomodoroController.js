
const Pomodoro = require("../models/Pomodoro");

const savePomodoro = async (req, res) => {
  // If using authentication, check for user
  // if (!req.user || !req.user._id) {
  //   return res.status(401).json({ message: "Unauthorized: user not found" });
  // }

  const { completedAt, duration } = req.body;
  if (!completedAt || !duration) {
    return res.status(400).json({ message: "completedAt and duration are required." });
  }

  try {
    const newSession = new Pomodoro({
      completedAt,
      duration,
      // user: req.user._id, // Uncomment if using auth
    });

    await newSession.save();
    res.status(201).json({ message: "Pomodoro saved!", session: newSession });
  } catch (error) {
    console.error("Error saving Pomodoro:", error);
    res.status(500).json({ message: "Server error while saving Pomodoro.", error: error.message });
  }
};

module.exports = { savePomodoro };
