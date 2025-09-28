const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Admin-only
router.post("/add", verifyToken, verifyAdmin, candidateController.addCandidate);

// Public
router.get("/election/:electionId", candidateController.getCandidatesByElection);

module.exports = router;
