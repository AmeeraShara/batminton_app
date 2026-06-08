const db = require("../config/db");

// Get all sessions with age groups
const getAllSessions = (callback) => {
  const sql = `
    SELECT
      s.id,
      s.session_name,
      s.day_of_week,
      s.start_time,
      s.end_time,
      ag.id AS age_group_id,
      ag.age_group_name
    FROM sessions s
    LEFT JOIN session_age_groups sag
      ON s.id = sag.session_id
    LEFT JOIN age_groups ag
      ON sag.age_group_id = ag.id
    ORDER BY s.id DESC
  `;

  db.query(sql, callback);
};

// Create session
const createSession = (data, callback) => {
  const sql = `
    INSERT INTO sessions
    (session_name, day_of_week, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [data.session_name, data.day_of_week, data.start_time, data.end_time],
    callback,
  );
};

// Add age groups
const addSessionAgeGroups = (sessionId, ageGroupIds, callback) => {
  if (!ageGroupIds || ageGroupIds.length === 0) {
    return callback(null);
  }

  const values = ageGroupIds.map((id) => [sessionId, id]);

  db.query(
    "INSERT INTO session_age_groups (session_id, age_group_id) VALUES ?",
    [values],
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
      end_time=?
    WHERE id=?
  `;

  db.query(
    sql,
    [data.session_name, data.day_of_week, data.start_time, data.end_time, id],
    callback,
  );
};

// Delete age groups
const deleteSessionAgeGroups = (sessionId, callback) => {
  db.query(
    "DELETE FROM session_age_groups WHERE session_id=?",
    [sessionId],
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
  addSessionAgeGroups,
  updateSession,
  deleteSessionAgeGroups,
  deleteSession,
};
