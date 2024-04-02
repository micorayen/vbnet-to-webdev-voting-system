const passport = require("passport");
const { storeReturnTo } = require("../middleware");

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res, next) => {
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
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/login");
  });
};
