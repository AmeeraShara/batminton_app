const db = require("../config/db");

// Get all sessions
const getAllSessions = (callback) => {
  db.query("SELECT * FROM sessions ORDER BY id DESC", callback);
};

// Create session
const createSession = (data, callback) => {
  const sql = `
    INSERT INTO sessions
    (session_name, day_of_week, start_time, end_time, age_group)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.session_name,
      data.day_of_week,
      data.start_time,
      data.end_time,
      data.age_group,
    ],
    callback,
  );
};

// Update session
const updateSession = (id, data, callback) => {
  const sql = `
    UPDATE sessions
    SET
      session_name=?,
      day_of_week=?,
      start_time=?,
      end_time=?,
      age_group=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      data.session_name,
      data.day_of_week,
      data.start_time,
      data.end_time,
      data.age_group,
      id,
    ],
    callback,
  );
};

// Delete session
const deleteSession = (id, callback) => {
  db.query("DELETE FROM sessions WHERE id=?", [id], callback);
};

module.exports = {
  getAllSessions,
  createSession,
  updateSession,
  deleteSession,
};
