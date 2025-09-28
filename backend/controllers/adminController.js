// controllers/adminController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  // Hash password
  const passwordHash = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)";
  db.query(sql, [username, passwordHash], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Username already exists" });
      }
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: "Admin registered successfully", adminId: result.insertId });
  });
};

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const sql = "SELECT * FROM admin_users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const user = results[0];
    const passwordValid = bcrypt.compareSync(password, user.password_hash);

    if (!passwordValid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ adminId: user.admin_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.status(200).json({ message: "Login successful", token });
  });
};
