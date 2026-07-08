// models/managementTeamModel.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

// Get all team members
exports.getAll = (callback) => {
  db.query(
    "SELECT id, name, role, email, mobile, created_at FROM management_team ORDER BY id DESC",
    callback
  );
};

// Get member by ID
exports.getById = (id, callback) => {
  db.query(
    "SELECT id, name, role, email, mobile, created_at FROM management_team WHERE id=?",
    [id],
    callback
  );
};

// Create member with hashed password
exports.create = (data, callback) => {
  // Hash the password
  bcrypt.hash(data.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Hashing error:', err);
      return callback(err);
    }
    
    console.log('Creating member with hashed password');
    db.query(
      "INSERT INTO management_team (name, role, email, mobile, password) VALUES (?, ?, ?, ?, ?)",
      [data.name, data.role, data.email, data.mobile, hashedPassword],
      callback
    );
  });
};

// Update member - only update password if provided
exports.update = (id, data, callback) => {
  console.log('Update data received:', { ...data, password: data.password ? '***' : 'not provided' });
  
  // Check if password is provided and not empty
  if (data.password && data.password.trim() !== '') {
    console.log('Password provided, hashing...');
    // Hash the new password
    bcrypt.hash(data.password.trim(), 10, (err, hashedPassword) => {
      if (err) {
        console.error('Hashing error:', err);
        return callback(err);
      }
      
      console.log('Password hashed successfully');
      const sql = "UPDATE management_team SET name=?, role=?, email=?, mobile=?, password=? WHERE id=?";
      db.query(
        sql,
        [data.name, data.role, data.email, data.mobile, hashedPassword, id],
        (err, result) => {
          if (err) {
            console.error('Update error:', err);
            return callback(err);
          }
          console.log('Update successful with password change');
          callback(null, result);
        }
      );
    });
  } else {
    console.log('No password provided, updating without password');
    // Update without changing password
    const sql = "UPDATE management_team SET name=?, role=?, email=?, mobile=? WHERE id=?";
    db.query(
      sql,
      [data.name, data.role, data.email, data.mobile, id],
      (err, result) => {
        if (err) {
          console.error('Update error:', err);
          return callback(err);
        }
        console.log('Update successful without password change');
        callback(null, result);
      }
    );
  }
};

// Delete member
exports.remove = (id, callback) => {
  console.log('Deleting member with ID:', id);
  db.query("DELETE FROM management_team WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return callback(err);
    }
    console.log('Delete result:', result);
    callback(null, result);
  });
};