const db = require("../config/db");

exports.getDashboardCounts = (callback) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM students) AS totalStudents,
      (SELECT COUNT(*) FROM age_groups) AS totalAgeGroups,
      (SELECT COUNT(*) FROM sessions) AS totalSessions
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err);
    }
    // Return the first row directly
    callback(null, results[0]);
  });
};