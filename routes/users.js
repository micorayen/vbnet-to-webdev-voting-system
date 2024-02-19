const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateUser } = require("../middleware");

// Require the user model
const User = require("../models/users");

const { roles } = require("../public/javascripts/tangentSelections");

// User Index Page
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.render("users/index", { users });
});

// render New User Form
router.get("/new", (req, res) => {
  res.render("users/new", { roles });
});

// create User
router.post("/", validateUser, async (req, res) => {
  const { role, fullName, username, password } = req.body.user;
  const user = new User({ role, fullName, username });
  await User.register(user, password);

  // req.flash("success", "Successfully created a user");
  res.redirect("/users");
});

// update User Information
router.patch(
  "/:id",
  validateUser,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body.user },
      {
        runValidators: true,
        new: true,
      }
    );
    await user.save();

    // req.flash("success", "Successfully updated user");
    res.redirect(`/users`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
  })
);

// Render Edit Form
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      req.flash("error", "Cannot find that user account");
      return res.redirect("/users");
    }

    res.render("users/edit", { user, roles });
  })
);

module.exports = router;
