const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCourse } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const courses = require("../controllers/courses");

router.get("/", isLoggedIn, isAccountLoggedIn, catchAsync(courses.index));

router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateCourse,
  catchAsync(courses.createCourse)
);

router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateCourse,
  catchAsync(courses.updateCourse)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(courses.deleteCourse)
);

module.exports = router;
