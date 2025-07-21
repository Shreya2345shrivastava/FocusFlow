const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(requireAuth);


// Input validation for task creation
const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }
  next();
};

// Input validation for task update
const validateTaskUpdate = (req, res, next) => {
  if (req.body.title !== undefined && !req.body.title) {
    return res.status(400).json({ message: "Title cannot be empty if provided." });
  }
  next();
};

router.post("/", validateTask, createTask);
router.get("/", getTasks);
router.patch(":id", validateTaskUpdate, updateTask);
router.delete("/:id", deleteTask); // Corrected route definition
module.exports = router;
