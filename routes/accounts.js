const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateAccount } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

// Require the account model
const Account = require("../models/accounts");

const { roles } = require("../public/javascripts/tangentSelections");

const { trimData } = require("../services/allService");

// Account Index Page
router.get(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const accounts = await Account.find({});
    res.render("accounts/index", { accounts });
  })
);

// render New Account Form
router.get("/new", isLoggedIn, isAccountLoggedIn, (req, res) => {
  res.render("accounts/new", { roles });
});

// create Account
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateAccount,
  catchAsync(async (req, res) => {
    // =====================================
    const data = req.body.account;
    const trimmedData = trimData(data);
    const { role, fullName, username, password } = trimmedData;
    // =====================================

    const existingAccount = await Account.findOne({
      $or: [{ fullName: fullName }, { username: username }],
    });

    if (existingAccount) {
      if (existingAccount.fullName === fullName) {
        return res
          .status(400)
          .json({ error: "Fullname already taken. Please choose another" });
      } else if (existingAccount.username === username) {
        return res
          .status(400)
          .json({ error: "Username already taken. Please choose another" });
      }
    }
    const account = new Account({ role, fullName, username });
    await Account.register(account, password);

    res.json({ success: "Successfully added new account" });
  })
);

// update Account Information
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateAccount,
  catchAsync(async (req, res) => {
    const data = req.body.account;
    const trimmedData = trimData(data);
    const { fullName, username } = trimmedData;

    const existingAccount = await Account.findOne({
      $or: [{ fullName: fullName }, { username: username }],
      _id: { $ne: req.params.id },
    });

    if (existingAccount) {
      if (existingAccount.fullName === fullName) {
        res
          .status(400)
          .json({ error: "Fullname already taken. Please choose another" });
      } else if (existingAccount.username === username) {
        res
          .status(400)
          .json({ error: "Username already taken. Please choose another" });
      }
    }

    await Account.findByIdAndUpdate(
      req.params.id,
      { ...trimmedData },
      {
        runValidators: true,
        new: true,
      }
    );
    res.json({ success: "Successfully updated account's information" });
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);

    req.flash("success", "Successfully deleted account");
    res.redirect("/accounts");
  })
);

// Render Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const account = await Account.findById(id);

    if (!account) {
      req.flash("error", "Cannot find account's information");
      return res.redirect("/accounts");
    }

    res.render("accounts/edit", { account, roles });
  })
);

module.exports = router;
