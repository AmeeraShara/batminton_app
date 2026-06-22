const db = require("../config/db");

// Get all attendance
exports.getAttendance = (req, res) => {
  console.log("GET /api/attendance - Fetching all attendance");
  
  const query = `
    SELECT 
      a.*,
      s.student_name,
      s.registration_number,
      ss.session_name,
      ag.age_group_name
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    JOIN sessions ss ON a.session_id = ss.id
    JOIN age_groups ag ON a.age_group_id = ag.id
    ORDER BY a.attendance_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error in getAttendance:", err);
      return res.status(500).json({ 
        error: "Database error", 
        details: err.message 
      });
    }
    console.log(`Found ${results?.length || 0} attendance records`);
    res.json(results || []);
  });
};

// Save attendance
exports.saveAttendance = (req, res) => {
  const data = req.body;
  console.log("POST /api/attendance - Received data:", JSON.stringify(data, null, 2));

  // Validate required fields
  if (!data.student_ids || !Array.isArray(data.student_ids) || data.student_ids.length === 0) {
    console.error("Validation failed: No students selected");
    return res.status(400).json({ error: "No students selected" });
  }

  if (!data.session_id) {
    console.error("Validation failed: Session ID is required");
    return res.status(400).json({ error: "Session ID is required" });
  }

  if (!data.date) {
    console.error("Validation failed: Date is required");
    return res.status(400).json({ error: "Date is required" });
  }

  // Prepare values for bulk insert
  const values = data.student_ids.map((studentId) => [
    parseInt(studentId),
    parseInt(data.session_id),
    data.age_group_id ? parseInt(data.age_group_id) : null,
    data.date,
    data.status || "present",
    data.remarks || null
  ]);

  console.log("Inserting values:", JSON.stringify(values, null, 2));

  const query = `
    INSERT INTO attendance 
      (student_id, session_id, age_group_id, attendance_date, status, remarks)
    VALUES ?
  `;

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Error in saveAttendance:", err);
      return res.status(500).json({ 
        error: "Database error", 
        details: err.message 
      });
    }

    console.log(`Successfully inserted ${result?.affectedRows || 0} attendance records`);
    res.json({
      success: true,
      message: "Attendance saved successfully",
      insertedCount: result?.affectedRows || 0
    });
  });
};

// Get student attendance history
exports.getStudentAttendance = (req, res) => {
  const studentId = req.params.studentId;
  console.log(`GET /api/attendance/student/${studentId} - Fetching student attendance`);

  if (!studentId || isNaN(parseInt(studentId))) {
    console.error("Validation failed: Invalid student ID");
    return res.status(400).json({ error: "Invalid student ID" });
  }

  const query = `
    SELECT 
      a.id,
      a.attendance_date,
      a.status,
      a.remarks,
      a.created_at,
      s.session_name,
      s.day_of_week,
      s.start_time,
      s.end_time
    FROM attendance a
    JOIN sessions s ON a.session_id = s.id
    WHERE a.student_id = ?
    ORDER BY a.attendance_date DESC, a.created_at DESC
  `;

  db.query(query, [parseInt(studentId)], (err, results) => {
    if (err) {
      console.error("Error in getStudentAttendance:", err);
      return res.status(500).json({ 
        error: "Database error", 
        details: err.message 
      });
    }
    console.log(`Found ${results?.length || 0} attendance records for student ${studentId}`);
    res.json(results || []);
  });
};

// Delete attendance
exports.deleteAttendance = (req, res) => {
  const id = req.params.id;
  console.log(`DELETE /api/attendance/${id} - Deleting attendance record`);

  if (!id || isNaN(parseInt(id))) {
    console.error("Validation failed: Invalid attendance ID");
    return res.status(400).json({ error: "Invalid attendance ID" });
  }

  const query = "DELETE FROM attendance WHERE id = ?";
  
  db.query(query, [parseInt(id)], (err, result) => {
    if (err) {
      console.error("Error in deleteAttendance:", err);
      return res.status(500).json({ 
        error: "Database error", 
        details: err.message 
      });
    }

    if (result.affectedRows === 0) {
      console.log(`Attendance record ${id} not found`);
      return res.status(404).json({ error: "Attendance record not found" });
    }

    console.log(`Successfully deleted attendance record ${id}`);
    res.json({ 
      success: true, 
      message: "Attendance record deleted successfully" 
    });
  });
};