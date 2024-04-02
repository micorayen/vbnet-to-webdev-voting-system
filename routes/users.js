const express = require("express");
const router = express.Router({ mergeParams: true });

const users = require("../controllers/users");

// renderLogin
router.get("/login", users.renderLogin);

// Login route
router.post("/login", users.login);

router.get("/logout", users.logout);

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
