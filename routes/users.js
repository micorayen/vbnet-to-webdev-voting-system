const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const passport = require("passport");
const { storeReturnTo, isLoggedIn } = require("../middleware");

const Account = require("../models/accounts");

// renderLogin
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Login route
router.post("/login", function (req, res, next) {
  const loginType = req.body.loginType;
  let strategyName;

  if (loginType === "account") {
    strategyName = "account-local";
  } else if (loginType === "voter") {
    strategyName = "voter-local";
  } else {
    // Handle invalid login type
    return res.redirect("/login");
  }

  passport.authenticate(strategyName, {
    failureFlash: true,
    failureRedirect: "/login",
  })(req, res, () => {
    const redirectUrl =
      res.locals.returnTo || (loginType === "voter" ? "/votes" : "/");
    delete req.session.returnTo; // Remove returnTo from session
    res.redirect(redirectUrl);
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/login");
  });
});

module.exports = router;

// Old Code =
// router.post("/login", function (req, res, next) {
//   const loginType = req.body.loginType;

//   if (loginType === "user") {
//     passport.authenticate("local", {
//       failureFlash: true,
//       failureRedirect: "/login",
//     })(req, res, () => {
//       const redirectUrl = res.locals.returnTo || "/";
//       delete req.session.returnTo;
//       res.redirect(redirectUrl);
//     });
//   } else if (loginType === "voter") {
//     passport.authenticate("local", {
//       failureFlash: true,
//       failureRedirect: "/login",
//     })(req, res, () => {
//       res.redirect("/votes");
//     });
//   } else {
//     // Handle invalid login type
//     res.redirect("/login");
//   }
// });
