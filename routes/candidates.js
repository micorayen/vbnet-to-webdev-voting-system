const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCandidate } = require("../middleware");

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

// --------------------

// render Index Form
router.get(
  "/",
  catchAsync(async (req, res) => {
    const parties = await Party.find();
    const candidates = await Candidate.find();
    res.render("candidates", { parties, candidatePositions, candidates });
  })
);

// render New Form
router.get(
  "/new",
  catchAsync(async (req, res) => {
    const parties = await Party.find();
    const courses = await Course.find();
    res.render("candidates/new", { parties, candidatePositions, courses });
  })
);

// create Candidate
router.post(
  "/",
  validateCandidate,
  catchAsync(async (req, res) => {
    const candidate = new Candidate(req.body.candidate);
    await candidate.save();
    res.redirect("/candidates");
  })
);

// render Show Form
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      // req.flash("error", "Cannot find that Candidate");
      console.log("Cannot find that candidate");
      return res.redirect("/candidates");
    }
    res.render("candidates/show", { candidate });
  })
);

// update Candidate
router.patch(
  "/:id",
  validateCandidate,
  catchAsync(async (req, res) => {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { ...req.body.candidate },
      { runValidators: true, new: true }
    );
    await candidate.save();

    res.redirect("/candidates");
  })
);

// delete Candidate
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    await Candidate.findByIdAndDelete(req.params.id);

    res.redirect("/candidates");
  })
);

// render Edit Form
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const parties = await Party.find();
    const courses = await Course.find();

    const candidate = await Candidate.findById(req.params.id);
    res.render("candidates/edit", {
      candidate,
      parties,
      candidatePositions,
      courses,
    });
  })
);

module.exports = router;
