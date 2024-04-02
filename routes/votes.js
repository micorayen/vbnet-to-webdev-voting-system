const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");

const {
  isLoggedIn,
  isVoterLoggedIn,
  checkVoteStatus,
} = require("../middleware");

const votes = require("../controllers/votes");

// Route accessible only to users logged in as "voter"
router.get(
  "/",
  isLoggedIn,
  isVoterLoggedIn,
  checkVoteStatus,
  catchAsync(votes.index)
);

router.patch("/update-vote-count", catchAsync(votes.updateVoteCount));

module.exports = router;
