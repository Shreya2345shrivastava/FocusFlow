const Pomodoro = require("../models/Pomodoro");
const mongoose = require("mongoose");

const pomodoroSchema = new mongoose.Schema({
  completedAt: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional: use only if user-based sessions
  },
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.models.Pomodoro || mongoose.model("Pomodoro", pomodoroSchema);
