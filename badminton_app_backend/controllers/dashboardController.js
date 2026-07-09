const Dashboard = require("../models/dashboardModel");

exports.getCounts = (req, res) => {
  Dashboard.getDashboardCounts((err, result) => {
    if (err) {
      console.error("Dashboard error:", err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    // Send the counts
    res.json(result);
  });
};