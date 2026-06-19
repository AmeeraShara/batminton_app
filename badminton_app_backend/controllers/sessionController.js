const Session = require("../models/sessionModel");

// Get All
exports.getSessions = (req, res) => {
  Session.getAllSessions((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    const formatted = results.map((session) => ({
      ...session,
      age_groups: session.age_group_ids
        ? session.age_group_ids.split(",").map(Number)
        : [],
      age_group_names: session.age_group_names
        ? session.age_group_names.split(",").map(name => name.trim())
        : [],
    }));

    res.json(formatted);
  });
};

// Create
exports.createSession = (req, res) => {
  Session.createSession(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Session created successfully",
      id: result.insertId,
    });
  });
};

// Update
exports.updateSession = (req, res) => {
  Session.updateSession(req.params.id, req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Session updated successfully",
    });
  });
};

// Delete
exports.deleteSession = (req, res) => {
  Session.deleteSession(req.params.id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Session deleted successfully",
    });
  });
};