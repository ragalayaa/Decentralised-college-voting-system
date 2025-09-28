const db = require("../config/db");

// Submit grievance
exports.submitGrievance = (req, res) => {
  const { student_id, department, category, details } = req.body;
  if (!department || !category || !details) return res.status(400).json({ error: "All fields required" });

  const sql = "INSERT INTO grievances (student_id, department, category, details) VALUES (?, ?, ?, ?)";
  db.query(sql, [student_id || null, department, category, details], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Grievance submitted", grievanceId: result.insertId });
  });
};

// Get all grievances
exports.getAllGrievances = (req, res) => {
  const sql = "SELECT * FROM grievances";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get grievance by ID
exports.getGrievanceById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM grievances WHERE grievance_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "Grievance not found" });
    res.json(results[0]);
  });
};

// Update grievance status
exports.updateGrievanceStatus = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const sql = "UPDATE grievances SET status = ? WHERE grievance_id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Grievance status updated" });
  });
};
