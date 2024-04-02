const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const voteStanding = require("../controllers/vote-standings");

// render Index Form
router.get("/", isLoggedIn, isAccountLoggedIn, catchAsync(voteStanding.index));

// Filter by position
router.get("/position/:position", catchAsync(voteStanding.filterByPosition));

module.exports = router;
