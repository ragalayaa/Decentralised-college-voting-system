const express = require("express");
const router = express.Router();
const grievanceController = require("../controllers/grievanceController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Public
router.post("/submit", grievanceController.submitGrievance);
router.get("/", grievanceController.getAllGrievances);
router.get("/:id", grievanceController.getGrievanceById);

// Admin-only: update grievance status
router.put("/:id/status", verifyToken, verifyAdmin, grievanceController.updateGrievanceStatus);

module.exports = router;
