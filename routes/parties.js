const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateParty } = require("../middleware");

const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

// Require the user model
const { Party } = require("../models/additionals");

// render Index
router.get(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const parties = await Party.find({});
    res.render("additionals/parties", { parties });
  })
);

// create Party
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateParty,
  catchAsync(async (req, res) => {
    const party = new Party(req.body);
    await party.save();

    req.flash("success", "Successfully added new partylist");
    res.redirect("/parties");
  })
);

router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateParty,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Party.findByIdAndUpdate(
      // const party = Party.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        runValidators: true,
        new: true,
      }
    );

    req.flash("success", "Successfully updated partylist's name ");
    res.redirect("/parties");
  })
);

// delete Party
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Party.findByIdAndDelete(id);

    req.flash("success", "Successfully removed partylist");
    res.redirect("/parties");
  })
);

module.exports = router;
