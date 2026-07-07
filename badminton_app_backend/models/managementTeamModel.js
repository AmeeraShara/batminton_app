const db = require("../config/db");

// Get all team members
exports.getAll = (callback) => {
  const sql = `
    SELECT
      id,
      name,
      role,
      email,
      mobile,
      created_at
    FROM management_team
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

// Get member by ID
exports.getById = (id, callback) => {
  db.query(
    "SELECT id,name,role,email,mobile,created_at FROM management_team WHERE id=?",
    [id],
    callback
  );
};

// Create member
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO management_team
    (name, role, email, mobile, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.name,
      data.role,
      data.email,
      data.mobile,
      data.password,
    ],
    callback
  );
};

// Update member
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE management_team
    SET
      name=?,
      role=?,
      email=?,
      mobile=?,
      password=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      data.name,
      data.role,
      data.email,
      data.mobile,
      data.password,
      id,
    ],
    callback
  );
};

// Delete member
exports.remove = (id, callback) => {
  db.query(
    "DELETE FROM management_team WHERE id=?",
    [id],
    callback
  );
};