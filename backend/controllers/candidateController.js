const db = require("../config/db");

// Add candidate
exports.addCandidate = (req, res) => {
  const { student_id, election_id, manifesto } = req.body;
  if (!student_id || !election_id) return res.status(400).json({ error: "student_id and election_id required" });

  const sql = "INSERT INTO candidates (student_id, election_id, manifesto) VALUES (?, ?, ?)";
  db.query(sql, [student_id, election_id, manifesto], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Candidate added", candidateId: result.insertId });
  });
};

// Get candidates by election
exports.getCandidatesByElection = (req, res) => {
  const electionId = req.params.electionId;
  const sql = `SELECT c.*, s.name AS student_name FROM candidates c
               JOIN students s ON c.student_id = s.student_id
               WHERE election_id = ?`;
  db.query(sql, [electionId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
