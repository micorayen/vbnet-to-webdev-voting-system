const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");

const {
  isLoggedIn,
  isVoterLoggedIn,
  checkVoteStatus,
} = require("../middleware");
const Candidate = require("../models/candidates");
const Voter = require("../models/voters");

const { getCandidatesByPosition } = require("../services/voteService");

// Route accessible only to users logged in as "voter"
router.get(
  "/",
  isLoggedIn,
  isVoterLoggedIn,
  checkVoteStatus,
  catchAsync(async (req, res) => {
    const loggedInVoter = req.user;
    const {
      presidents,
      vpInternals,
      vpExternals,
      auditors,
      treasurers,
      secretaries,
      pros,
      firstYearReps,
      secondYearReps,
      thirdYearReps,
      fourthYearReps,
    } = await getCandidatesByPosition();

    res.render("votes", {
      loggedInVoter,
      presidents,
      vpInternals,
      vpExternals,
      auditors,
      treasurers,
      secretaries,
      pros,
      firstYearReps,
      secondYearReps,
      thirdYearReps,
      fourthYearReps,
    });
  })
);

router.patch(
  "/update-vote-count",
  catchAsync(async (req, res) => {
    await Candidate.updateMany(
      { fullName: { $in: Object.values(req.body) } },
      { $inc: { voteCount: 1 } }
    );

    // console.log(req.user.fullName);
    await Voter.findOneAndUpdate(
      { fullName: req.user.fullName },
      { $set: { voteStatus: "Voted" } },
      { new: true }
    );

    res.redirect("/logout");
  })
);

module.exports = router;
