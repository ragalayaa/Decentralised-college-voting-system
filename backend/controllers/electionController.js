const db = require("../config/db");

// Create election
exports.createElection = (req, res) => {
  const { title, description, start_time, end_time, created_by } = req.body;
  if (!title || !start_time || !end_time || !created_by)
    return res.status(400).json({ error: "All fields required" });

  const sql = "INSERT INTO elections (title, description, start_time, end_time, created_by) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, description, start_time, end_time, created_by], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Election created", electionId: result.insertId });
  });
};

// Get all elections
exports.getAllElections = (req, res) => {
  const sql = "SELECT * FROM elections";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get election by ID
exports.getElectionById = (req, res) => {
  const electionId = req.params.id;
  const sql = "SELECT * FROM elections WHERE election_id = ?";
  db.query(sql, [electionId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Election not found" });
    res.status(200).json(results[0]);
  });
};

