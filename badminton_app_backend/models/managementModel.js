// models/managementTeamModel.js
const db = require('../config/db');

const Team = {
  getAll: (callback) => {
    const query = 'SELECT id, name, mobile, email, role, created_at FROM team_members ORDER BY created_at DESC';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT id, name, mobile, email, role FROM team_members WHERE id = ?';
    db.query(query, [id], callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO team_members (name, mobile, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(
      query,
      [data.name, data.mobile, data.email, data.password, data.role],
      callback
    );
  },

  update: (id, data, callback) => {
    let query = 'UPDATE team_members SET name = ?, mobile = ?, email = ?, role = ?';
    const params = [data.name, data.mobile, data.email, data.role];
    
    // If password is included in the update, add it to the query
    if (data.password) {
      query += ', password = ?';
      params.push(data.password);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    db.query(query, params, callback);
  },

  remove: (id, callback) => {
    const query = 'DELETE FROM team_members WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Team;