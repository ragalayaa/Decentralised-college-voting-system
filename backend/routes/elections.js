const express = require("express");
const router = express.Router();
const electionController = require("../controllers/electionController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Admin-only
router.post("/create", verifyToken, verifyAdmin, electionController.createElection);
router.get("/", verifyToken, electionController.getAllElections);
// Public
// router.get("/", electionController.getAllElections);
router.get("/:id", electionController.getElectionById);

module.exports = router;
