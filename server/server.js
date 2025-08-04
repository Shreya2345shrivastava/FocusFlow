const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');

// Load environment variables FIRST
dotenv.config();

// Now import passport (which needs env vars)
const passport = require('./config/passport');

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const taskRoutes = require("./routes/taskRoutes");
const pomodoroRoutes = require("./routes/pomodoroRoutes");
const profileRoutes = require('./routes/profileRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const requireAuth = require("./middleware/requireAuth");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'https://focus-flow-kohl.vercel.app', // Your Vercel deployment
    'http://localhost:3000' // Alternative local port
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Session configuration for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get("/", (req, res) => {
  res.send("📘 FocusFlow server is running!");
});

// Route mounting
app.use("/api/user", authRoutes);
app.use("/auth", authRoutes); // For Google OAuth routes
app.use("/api/journals", journalRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/pomodoro", pomodoroRoutes);
app.use('/api', profileRoutes);
app.use('/api/password', passwordRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });
