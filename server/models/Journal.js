const mongoose = require("mongoose");


const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.models.Journal || mongoose.model("Journal", journalSchema);
