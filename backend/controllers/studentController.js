const db = require("../config/db");

// Register student
exports.registerStudent = (req, res) => {
  const { name, email, department, year } = req.body;

  if (!name || !email || !department || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO students (name, email, department, year) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, department, year], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(201).json({ message: "Student registered successfully", studentId: result.insertId });
  });
};

// Get student by ID
exports.getStudentById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE student_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json(result[0]);
  });
};

// Get all students
exports.getAllStudents = (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

const jwt = require("jsonwebtoken");

exports.loginStudent = (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const sql = "SELECT * FROM students WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "Student not found" });

    const student = results[0];

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student.student_id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({ message: "Login successful", token });
  });
};
