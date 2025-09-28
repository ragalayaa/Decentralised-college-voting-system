const db = require("../config/db");

// Create poll
exports.createPoll = (req, res) => {
  const { question, options, start_time, end_time } = req.body;
  if (!question || !options || !start_time || !end_time) return res.status(400).json({ error: "All fields required" });

  const sql = "INSERT INTO issue_polls (question, options, start_time, end_time) VALUES (?, ?, ?, ?)";
  db.query(sql, [question, JSON.stringify(options), start_time, end_time], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Poll created", pollId: result.insertId });
  });
};

// Vote in poll
exports.votePoll = (req, res) => {
  const { student_id, poll_id, selected_option } = req.body;
  if (!student_id || !poll_id || !selected_option) return res.status(400).json({ error: "All fields required" });

  const sql = "INSERT INTO issue_poll_votes (student_id, poll_id, selected_option) VALUES (?, ?, ?)";
  db.query(sql, [student_id, poll_id, selected_option], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Student already voted in this poll" });
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: "Poll vote recorded", voteId: result.insertId });
  });
};

// Get poll votes
exports.getPollVotes = (req, res) => {
  const pollId = req.params.pollId;
  const sql = "SELECT * FROM issue_poll_votes WHERE poll_id = ?";
  db.query(sql, [pollId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get all polls
exports.getAllPolls = (req, res) => {
  const sql = "SELECT * FROM issue_polls";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
