const Team = require("../models/managementTeamModel");

// Get all members
exports.getMembers = (req, res) => {
  Team.getAll((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err,
      });
    }

    res.json(results);
  });
};

// Get single member
exports.getMember = (req, res) => {
  const id = req.params.id;

  Team.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json(results[0]);
  });
};

// Create member
exports.createMember = (req, res) => {
  const data = req.body;

  if (
    !data.name ||
    !data.role ||
    !data.email ||
    !data.mobile ||
    !data.password
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  Team.create(data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Team member added successfully",
      insertId: result.insertId,
    });
  });
};

// Update member
exports.updateMember = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Team.update(id, data, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Team member updated successfully",
    });
  });
};

// Delete member
exports.deleteMember = (req, res) => {
  const id = req.params.id;

  Team.remove(id, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message: "Team member deleted successfully",
    });
  });
};