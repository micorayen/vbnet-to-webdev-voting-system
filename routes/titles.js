const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");
const { validateTitle } = require("../middleware");

const titles = require("../controllers/titles");

router.put(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateTitle,
  catchAsync(titles.updateTitle)
);

module.exports = router;
