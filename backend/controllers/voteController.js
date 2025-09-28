const db = require("../config/db");

// Cast vote
exports.castVote = (req, res) => {
  const { student_id, election_id, candidate_id, blockchain_txn_hash } = req.body;
  if (!student_id || !election_id || !candidate_id)
    return res.status(400).json({ error: "All fields required" });

  // Check student eligibility
  const sqlEligibility = "SELECT is_eligible FROM students WHERE student_id = ?";
  db.query(sqlEligibility, [student_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0 || !result[0].is_eligible)
      return res.status(403).json({ error: "Student not eligible to vote" });

    // Check election time
    const sqlElection = "SELECT * FROM elections WHERE election_id = ? AND start_time <= NOW() AND end_time >= NOW()";
    db.query(sqlElection, [election_id], (err2, electionResult) => {
      if (err2) return res.status(500).json({ error: err2 });
      if (electionResult.length === 0)
        return res.status(403).json({ error: "Election not active" });

      // Cast vote
      const sqlVote = "INSERT INTO votes_cast (student_id, election_id, candidate_id, blockchain_txn_hash) VALUES (?, ?, ?, ?)";
      db.query(sqlVote, [student_id, election_id, candidate_id, blockchain_txn_hash || null], (err3, voteResult) => {
        if (err3) {
          if (err3.code === "ER_DUP_ENTRY")
            return res.status(400).json({ error: "Student has already voted in this election" });
          return res.status(500).json({ error: err3 });
        }

        // Optional: Log action
        const sqlLog = "INSERT INTO logs (action, performed_by) VALUES (?, ?)";
        db.query(sqlLog, [`Vote cast in election ${election_id} for candidate ${candidate_id}`, student_id], () => {});

        res.status(201).json({ message: "Vote cast successfully", voteId: voteResult.insertId });
      });
    });
  });
};

// Get votes by election
exports.getVotesByElection = (req, res) => {
  const { electionId } = req.params;
  const sql = `
    SELECT v.vote_id, s.name AS student_name, c.name AS candidate_name, v.vote_time
    FROM votes_cast v
    JOIN students s ON v.student_id = s.student_id
    JOIN candidates c ON v.candidate_id = c.candidate_id
    WHERE v.election_id = ?
  `;
  db.query(sql, [electionId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
};
