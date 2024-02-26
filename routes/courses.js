const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCourse } = require("../middleware");

// Require the user model
const { Course } = require("../models/additionals");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const courses = await Course.find();
    res.render("additionals/courses", { courses });
  })
);

router.post(
  "/",
  validateCourse,
  catchAsync(async (req, res) => {
    const course = await new Course(req.body);
    await course.save();
    res.redirect("/courses");
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect("/courses");
  })
);

router.patch(
  "/:id",
  validateCourse,
  catchAsync(async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.redirect("/courses");
  })
);

module.exports = router;
