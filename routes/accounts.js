const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { validateAccount } = require("../middleware");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const accounts = require("../controllers/accounts");

// Account Index Page
router.get("/", isLoggedIn, isAccountLoggedIn, catchAsync(accounts.index));

// render New Account Form
router.get("/new", isLoggedIn, isAccountLoggedIn, accounts.renderNewForm);

// create Account
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateAccount,
  catchAsync(accounts.createAccount)
);

// update Account Information
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateAccount,
  catchAsync(accounts.updateAccount)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(accounts.deleteAccount)
);

// Render Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(accounts.renderEditForm)
);

module.exports = router;
