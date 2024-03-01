const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const Candidate = require("../models/candidates");
const { getVoteStandings } = require("../services/leading-candidates");

const {
  candidatePositions,
} = require("../public/javascripts/tangentSelections");

// render Index Form
router.get(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const candidates = await Candidate.find();

    const {
      president,
      vpInternal,
      vpExternal,
      auditor,
      treasurer,
      secretary,
      pro,
      firstYearRep,
      secondYearRep,
      thirdYearRep,
      fourthYearRep,
    } = await getVoteStandings();

    res.render("vote-standings", {
      candidatePositions,
      candidates,
      president,
      vpInternal,
      vpExternal,
      auditor,
      treasurer,
      secretary,
      pro,
      firstYearRep,
      secondYearRep,
      thirdYearRep,
      fourthYearRep,
    });
  })
);

// Filter by position
router.get(
  "/position/:position",
  catchAsync(async (req, res) => {
    if (req.params.position === "0") {
      const candidates = await Candidate.find();
      res.json(candidates);
    } else {
      const filterByPosition = await Candidate.find({
        position: req.params.position,
      });
      res.json(filterByPosition);
    }
  })
);

// VoteStandingsController.js

module.exports = router;
