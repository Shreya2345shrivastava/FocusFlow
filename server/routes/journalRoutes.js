const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { createJournal, getJournals, deleteJournal } = require("../controllers/journalController");

router.use(requireAuth);

// Input validation for journal creation
const validateJournal = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  next();
};

router.post("/", validateJournal, createJournal);
router.get("/", getJournals);
router.delete("/:id", requireAuth, deleteJournal);

module.exports = router;
