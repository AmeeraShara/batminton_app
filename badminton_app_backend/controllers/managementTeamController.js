// controllers/managementTeamController.js
const Team = require("../models/managementTeamModel");
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// Get all members
exports.getMembers = (req, res) => {
  Team.getAll((err, results) => {
    if (err) {
      console.error('Get all error:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json(results);
  });
};

// Get single member
exports.getMember = (req, res) => {
  const id = req.params.id;
  Team.getById(id, (err, results) => {
    if (err) {
      console.error('Get by id error:', err);
      return res.status(500).json({ success: false, error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    res.json(results[0]);
  });
};

// Create member
exports.createMember = async (req, res) => {
  try {
    const data = req.body;
    console.log('Create member request body:', { ...data, password: data.password ? '***' : 'not provided' });
    
    // Validate required fields
    if (!data.name || !data.role || !data.email || !data.mobile || !data.password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    data.password = hashedPassword;

    Team.create(data, (err, result) => {
      if (err) {
        console.error('Create error:', err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: err
        });
      }
      res.json({
        success: true,
        message: "Team member added successfully",
        insertId: result.insertId,
      });
    });
  } catch (error) {
    console.error('Error in createMember:', error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Update member
exports.updateMember = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    
    console.log('Update member request:');
    console.log('ID:', id);
    console.log('Data:', { ...data, password: data.password ? '***' : 'not provided' });

    // Validate required fields
    if (!data.name || !data.role || !data.email || !data.mobile) {
      return res.status(400).json({
        success: false,
        message: "Name, Role, Email, and Mobile are required",
      });
    }

    // Check if member exists
    Team.getById(id, async (err, results) => {
      if (err) {
        console.error('Get by id error:', err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: err
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Member not found"
        });
      }

      // If password is provided, hash it
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        data.password = hashedPassword;
      } else {
        // If no password provided, remove it from update data
        delete data.password;
      }

      // Update the member
      Team.update(id, data, (err, result) => {
        if (err) {
          console.error('Update error:', err);
          return res.status(500).json({
            success: false,
            message: "Database Error",
            error: err
          });
        }
        console.log('Update successful');
        res.json({
          success: true,
          message: "Team member updated successfully",
        });
      });
    });
  } catch (error) {
    console.error('Error in updateMember:', error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Delete member
exports.deleteMember = (req, res) => {
  const id = req.params.id;
  console.log('Deleting member with ID:', id);
  
  // Check if member exists
  Team.getById(id, (err, results) => {
    if (err) {
      console.error('Get by id error:', err);
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    // Delete the member
    Team.remove(id, (err) => {
      if (err) {
        console.error('Delete error:', err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: err
        });
      }
      console.log('Delete successful for ID:', id);
      res.json({
        success: true,
        message: "Team member deleted successfully",
      });
    });
  });
};