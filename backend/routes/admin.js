const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Public route for login
router.post("/login", adminController.loginAdmin);

// Protected route for admin registration (optional)
router.post("/register", verifyToken, verifyAdmin, adminController.registerAdmin);



module.exports = router;
