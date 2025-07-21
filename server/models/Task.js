const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date }
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
