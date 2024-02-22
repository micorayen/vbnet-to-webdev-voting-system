const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateVoter } = require("../middleware");

// Require the user model
const Voter = require("../models/voters");

// index Voters
router.get(
  "/",
  catchAsync(async (req, res) => {
    const voters = await Voter.find({});
    res.render("voters/index", { voters });
  })
);

// render New Form
router.get("/new", (req, res) => {
  res.render("voters/new");
});

// create new Voter
router.post(
  "/",
  validateVoter,
  catchAsync(async (req, res) => {
    const { username, fullName, course, yearLevel, password } = req.body.voter;
    const voter = new Voter({ username, fullName, course, yearLevel });
    await Voter.register(voter, password);

    res.redirect("/voters");
  })
);

// delete Voter Account
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Voter.findByIdAndDelete(id);

    res.redirect("/voters");
  })
);

// update Voter Information
router.patch(
  "/:id",
  validateVoter,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const voter = await Voter.findByIdAndUpdate(
      id,
      { ...req.body.voter },
      { runValidators: true, new: true }
    );
    await voter.save();

    res.redirect("/voters");
  })
);

// render Edit Form
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const voter = await Voter.findById(id);

    if (!voter) {
      return res.redirect("/voters");
    }

    res.render("voters/edit", { voter });
  })
);

module.exports = router;
