const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isVoterLoggedIn } = require("../middleware");
const {
  getCandidatesByPosition,
} = require("../services/candidates-by-position");

// Route accessible only to users logged in as "voter"
router.get(
  "/",
  isLoggedIn,
  isVoterLoggedIn,
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

    console.log(presidents);

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

module.exports = router;
