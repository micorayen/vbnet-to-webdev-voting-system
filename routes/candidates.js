const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCandidate } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const { Party, Course } = require("../models/additionals");
const Candidate = require("../models/candidates");

/// CANDIDATES ROUTES:
const {
  candidatePositions,
} = require("../public/javascripts/tangentSelections");
// --------------------

// Filter by party or position
router.get(
  "/party/:party",
  catchAsync(async (req, res) => {
    if (req.params.party === "0") {
      const candidates = await Candidate.find();
      res.json(candidates);
    } else {
      const filterByParty = await Candidate.find({ party: req.params.party });
      res.json(filterByParty);
    }
  })
);

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

// render Index Form
router.get(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const parties = await Party.find();
    const candidates = await Candidate.find();
    res.render("candidates", { parties, candidatePositions, candidates });
  })
);

// render New Form
router.get(
  "/new",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const parties = await Party.find();
    const courses = await Course.find();
    res.render("candidates/new", { parties, candidatePositions, courses });
  })
);

// create Candidate
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateCandidate,
  catchAsync(async (req, res) => {
    const candidate = new Candidate(req.body.candidate);
    await candidate.save();

    req.flash("success", "Successfully added new candidate");
    res.redirect("/candidates");
  })
);

// render Show Form
router.get(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      req.flash("error", "Cannot find candidate's information");
      console.log("Cannot find that candidate");
      return res.redirect("/candidates");
    }
    res.render("candidates/show", { candidate });
  })
);

// update Candidate
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateCandidate,
  catchAsync(async (req, res) => {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { ...req.body.candidate },
      { runValidators: true, new: true }
    );
    await candidate.save();

    req.flash("success", "Successfully updated candidate's information");
    res.redirect("/candidates");
  })
);

// delete Candidate
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    await Candidate.findByIdAndDelete(req.params.id);

    req.flash("success", "Successfully removed candidate");
    res.redirect("/candidates");
  })
);

// render Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const parties = await Party.find();
    const courses = await Course.find();

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      req.flash("error", "Cannot find candidate's information");
      return res.redirect("/candidates");
    }

    res.render("candidates/edit", {
      candidate,
      parties,
      candidatePositions,
      courses,
    });
  })
);

module.exports = router;
