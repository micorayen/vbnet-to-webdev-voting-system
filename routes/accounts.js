const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateAccount } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

// Require the account model
const Account = require("../models/accounts");

const { roles } = require("../public/javascripts/tangentSelections");

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
    const { role, fullName, username, password } = req.body.account;
    const account = new Account({ role, fullName, username });
    await Account.register(account, password);

    req.flash("success", "Successfully added new account");
    res.redirect("/accounts");
  })
);

// update Account Information
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateAccount,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const account = await Account.findByIdAndUpdate(
      id,
      { ...req.body.account },
      {
        runValidators: true,
        new: true,
      }
    );
    await account.save();

    req.flash("success", "Successfully updated account's information");
    res.redirect(`/accounts`);
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
