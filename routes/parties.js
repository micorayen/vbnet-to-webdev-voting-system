const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateParty } = require("../middleware");

// Require the user model
const { Party } = require("../models/additionals");

// render Index
router.get(
  "/",
  catchAsync(async (req, res) => {
    const parties = await Party.find({});
    res.render("additionals/parties", { parties });
  })
);

// create Party
router.post(
  "/",
  validateParty,
  catchAsync(async (req, res) => {
    const party = new Party(req.body);
    await party.save();
    res.redirect("/parties");
  })
);

// delete Party
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Party.findByIdAndDelete(id);

    res.redirect("/parties");
  })
);

router.patch(
  "/:id",
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

    res.redirect("/parties");
  })
);

module.exports = router;
