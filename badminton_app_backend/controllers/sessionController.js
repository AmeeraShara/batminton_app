const Session = require("../models/sessionModel");

// GET ALL
exports.getSessions = (req, res) => {
  Session.getAllSessions((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    const sessions = [];

    results.forEach((row) => {
      let session = sessions.find((s) => s.id === row.id);

      if (!session) {
        session = {
          id: row.id,
          session_name: row.session_name,
          day_of_week: row.day_of_week,
          start_time: row.start_time,
          end_time: row.end_time,
          age_groups: [],
        };

        sessions.push(session);
      }

      if (row.age_group_id) {
        session.age_groups.push({
          id: row.age_group_id,
          age_group_name: row.age_group_name,
        });
      }
    });

    res.json(sessions);
  });
};

// CREATE
exports.createSession = (req, res) => {
  const { session_name, day_of_week, start_time, end_time, age_group_ids } =
    req.body;

  Session.createSession(
    {
      session_name,
      day_of_week,
      start_time,
      end_time,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const sessionId = result.insertId;

      Session.addSessionAgeGroups(sessionId, age_group_ids, (err2) => {
        if (err2) {
          return res.status(500).json(err2);
        }

        res.json({
          message: "Session created successfully",
        });
      });
    },
  );
};

// UPDATE
exports.updateSession = (req, res) => {
  const id = req.params.id;

  Session.updateSession(id, req.body, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    Session.deleteSessionAgeGroups(id, (err2) => {
      if (err2) {
        return res.status(500).json(err2);
      }

      Session.addSessionAgeGroups(id, req.body.age_group_ids, (err3) => {
        if (err3) {
          return res.status(500).json(err3);
        }

        res.json({
          message: "Session updated successfully",
        });
      });
    });
  });
};

// DELETE
exports.deleteSession = (req, res) => {
  const id = req.params.id;

  Session.deleteSessionAgeGroups(id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    Session.deleteSession(id, (err2) => {
      if (err2) {
        return res.status(500).json(err2);
      }

      res.json({
        message: "Session deleted successfully",
      });
    });
  });
};
