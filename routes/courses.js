const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCourse } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

// Require the user model
const { Course } = require("../models/additionals");

router.get(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const courses = await Course.find();
    res.render("additionals/courses", { courses });
  })
);

router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateCourse,
  catchAsync(async (req, res) => {
    const course = await new Course(req.body);
    await course.save();

    req.flash("success", "Successfully added new academic course");
    res.redirect("/courses");
  })
);

router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateCourse,
  catchAsync(async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    req.flash("success", "Successfully updated academic course's name ");
    res.redirect("/courses");
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);

    req.flash("success", "Successfully removed academic course");
    res.redirect("/courses");
  })
);

module.exports = router;
