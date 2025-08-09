const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require('passport');

// Load environment variables FIRST
dotenv.config();

// Import passport configuration AFTER dotenv
require('./config/passport');

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
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173', // Local development
      'http://localhost:5174', // Local development (alternate port)
      'https://focus-flow-kohl.vercel.app', // Your Vercel deployment (old)
      'https://focus-flow-shreya.vercel.app', // Your Vercel deployment (new)
      'http://localhost:3000' // Alternative local port
    ];
    
    console.log('CORS - Request from origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('CORS - Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('CORS - Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Test route
app.get("/", (req, res) => {
  res.send("📘 FocusFlow server is running!");
});

// Route mounting
app.use("/api/user", authRoutes); // Keep for login/signup
app.use("/auth", authRoutes); // Add for Google OAuth
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
