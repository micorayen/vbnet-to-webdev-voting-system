const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");
const { validateVoter } = require("../middleware");

const voters = require("../controllers/voters");

// index Voters
router.get("/", isLoggedIn, isAccountLoggedIn, catchAsync(voters.index));

// render New Form
router.get(
  "/new",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(voters.renderNewForm)
);

// create new Voter
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateVoter,
  catchAsync(voters.createVoter)
);

// update Voter Information
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateVoter,
  catchAsync(voters.updateVoter)
);

// delete Voter Account
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(voters.deleteVoter)
);

// render Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(voters.renderEditForm)
);

module.exports = router;
