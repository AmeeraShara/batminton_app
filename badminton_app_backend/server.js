const express = require("express");
const cors = require("cors");
const path = require("path");

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const ageGroupRoutes = require("./routes/ageGroupRoutes");
const studentRoutes = require("./routes/studentRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const managementTeamRoutes = require("./routes/managementTeamRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/agegroups", ageGroupRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/management-team", managementTeamRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Cricket Academy API is running",
    version: "1.0.0",
    endpoints: [
      "/api/auth",
      "/api/dashboard",
      "/api/students",
      "/api/agegroups",
      "/api/sessions",
      "/api/attendance",
      "/api/payments",
      "/api/management-team"
    ]
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`========================================`);
  console.log(`🚀 Server Running on Port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Test Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`========================================`);
});