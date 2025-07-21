const Journal = require("../models/Journal");

exports.createJournal = async (req, res) => {
  const { title, content } = req.body;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized: userId missing" });
  }
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const journal = new Journal({ user: req.userId, title, content, date: new Date() });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: "Failed to create journal", error: err.message });
  }
};

exports.getJournals = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized: userId missing" });
  }
  try {
    const journals = await Journal.find({ user: req.userId }).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch journals", error: err.message });
  }
};

exports.deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJournal = await Journal.findByIdAndDelete(id);

    if (!deletedJournal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.error("Error deleting journal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
