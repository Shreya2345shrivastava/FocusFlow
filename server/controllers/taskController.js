const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized: userId missing" });
  }
  const { title, description, dueDate } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const task = new Task({ user: req.userId, title, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized: userId missing" });
  }
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized: userId missing" });
  }
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized: userId missing" });
  }
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};
