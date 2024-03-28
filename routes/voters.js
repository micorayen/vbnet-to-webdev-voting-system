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

    const existingVoter = await Voter.findOne({
      $or: [{ username: username }, { fullName: fullName }],
    });

    if (existingVoter) {
      if (existingVoter.username === username) {
        res
          .status(400)
          .json({ error: "ID Number already taken. Please choose another" });
      } else if (existingVoter.fullName === fullName) {
        res
          .status(400)
          .json({ error: "Fullname already taken. Please choose another" });
      }
    } else {
      const voter = new Voter({ username, fullName, course, yearLevel });
      await Voter.register(voter, password);

      res.json({ success: "Successfully added new voter" });
    }
  })
);

// update Voter Information
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateVoter,
  catchAsync(async (req, res) => {
    const { username, fullName } = req.body.voter;
    const { id } = req.params;

    const existingUser = await Voter.findOne({
      $or: [{ username }, { fullName }],
      _id: { $ne: id },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        res
          .status(400)
          .json({ error: "ID Number already taken. Please choose another" });
      } else if (existingUser.fullName === fullName) {
        res
          .status(400)
          .json({ error: "Fullname already taken. Please choose another" });
      }
    } else {
      const voter = await Voter.findByIdAndUpdate(
        id,
        { ...req.body.voter },
        { runValidators: true, new: true }
      );
      await voter.save();

      res.json({ success: "Successfully updated voter's information" });
    }
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
