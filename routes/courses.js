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
    let { course } = req.body;
    course = course.trim();

    const existingCourse = await Course.findOne({ course: course });
    if (existingCourse) {
      return res.status(400).json({ error: "academic's course already exist" });
    }

    await new Course({ course: course }).save();
    res.json({ success: "Successfully added new academic course" });
  })
);

router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateCourse,
  catchAsync(async (req, res) => {
    let { course } = req.body;
    course = course.trim();

    const existingCourse = await Course.findOne({
      course,
      _id: { $ne: req.params.id },
    });
    if (existingCourse) {
      return res.status(400).json({ error: "academic's course already exist" });
    }

    await Course.findByIdAndUpdate(
      req.params.id,
      { course: course },
      {
        runValidators: true,
        new: true,
      }
    );
    res.json({ success: "Successfully updated academic course's name" });
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);

    res.json({ success: "Successfully removed academic course" });
  })
);

module.exports = router;
