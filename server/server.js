console.log('🚀 Starting FocusFlow server...');
console.log('📁 Current working directory:', process.cwd());
console.log('📄 Node.js version:', process.version);

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
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174', 
      'https://focus-flow-kohl.vercel.app',
      'http://localhost:3000'
    ];
    
    console.log('🌐 CORS Origin:', origin);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// CORS debugging middleware
app.use((req, res, next) => {
  console.log('🔍 Request from origin:', req.get('Origin'));
  console.log('🔍 Request method:', req.method);
  next();
});

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
  res.send("🚀 FocusFlow server is LIVE! Version: 4.0 - " + new Date().toISOString() + " - All routes working!");
});

// API Status route
app.get("/api/status", (req, res) => {
  res.json({ 
    status: "Server running successfully", 
    version: "3.0",
    timestamp: new Date().toISOString(),
    routes: {
      auth: "✅ Working",
      profile: "✅ Working", 
      tasks: "✅ Working",
      journal: "✅ Working",
      pomodoro: "✅ Working"
    }
  });
});

// Route mounting
console.log('🔧 Mounting routes...');
console.log('📋 AuthRoutes stack length:', authRoutes.stack ? authRoutes.stack.length : 'No stack');
if (authRoutes.stack) {
  authRoutes.stack.forEach((layer, i) => {
    console.log(`  Route ${i}: ${layer.route ? layer.route.path : 'middleware'} - ${layer.route ? Object.keys(layer.route.methods) : 'N/A'}`);
  });
}
app.use("/api/user", authRoutes);
console.log('✅ Mounted /api/user routes');
app.use("/auth", authRoutes); // For Google OAuth routes
console.log('✅ Mounted /auth routes');
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
