const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// Admin-only: create poll
router.post("/create", verifyToken, verifyAdmin, pollController.createPoll);

// Public
router.get("/", pollController.getAllPolls);
router.post("/vote", verifyToken, pollController.votePoll);
router.get("/:pollId/votes", pollController.getPollVotes);

module.exports = router;
