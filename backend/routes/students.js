const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Existing register route
router.post("/register", studentController.registerStudent);

// Add login route
router.post("/login", studentController.loginStudent);
// Get all students
router.get("/", studentController.getAllStudents);


module.exports = router;
