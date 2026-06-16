const Session = require("../models/sessionModel");

// Get all sessions
exports.getSessions = (req, res) => {
  Session.getAllSessions((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// Create session
exports.createSession = (req, res) => {
  Session.createSession(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Session created successfully",
      id: result.insertId,
    });
  });
};

// Update session
exports.updateSession = (req, res) => {
  Session.updateSession(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Session updated successfully",
    });
  });
};

// Delete session
exports.deleteSession = (req, res) => {
  Session.deleteSession(req.params.id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Session deleted successfully",
    });
  });
};
