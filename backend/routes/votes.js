const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const { verifyToken } = require("../middleware/auth");

router.post("/cast", verifyToken, voteController.castVote);
router.get("/election/:electionId", voteController.getVotesByElection);

module.exports = router;
