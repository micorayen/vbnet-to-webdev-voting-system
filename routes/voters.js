const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateVoter } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

// Require the user model
const { Course } = require("../models/additionals");
const Voter = require("../models/voters");

// index Voters
router.get(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const voters = await Voter.find({});
    res.render("voters/index", { voters });
  })
);

// render New Form
router.get(
  "/new",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const courses = await Course.find();

    res.render("voters/new", { courses });
  })
);

// create new Voter
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateVoter,
  catchAsync(async (req, res) => {
    const { username, fullName, course, yearLevel, password } = req.body.voter;
    const voter = new Voter({ username, fullName, course, yearLevel });
    await Voter.register(voter, password);

    req.flash("success", "Successfully added new voter");
    res.redirect("/voters");
  })
);

// update Voter Information
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateVoter,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const voter = await Voter.findByIdAndUpdate(
      id,
      { ...req.body.voter },
      { runValidators: true, new: true }
    );
    await voter.save();

    req.flash("success", "Successfully updated voter's information");
    res.redirect("/voters");
  })
);

// delete Voter Account
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Voter.findByIdAndDelete(id);

    req.flash("success", "Successfully deleted voter");
    res.redirect("/voters");
  })
);

// render Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const courses = await Course.find();

    const voter = await Voter.findById(req.params.id);

    if (!voter) {
      req.flash("error", "Cannot find voter's information");
      return res.redirect("/voters");
    }

    res.render("voters/edit", { voter, courses });
  })
);

module.exports = router;
