const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const Candidate = require("../models/candidates");

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
    res.render("vote-standings", { candidatePositions, candidates });
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

module.exports = router;
