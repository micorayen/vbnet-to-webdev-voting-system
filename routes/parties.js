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
    let { party } = req.body;
    party = party.trim();

    const existingParty = await Party.findOne({ party: party });
    if (existingParty) {
      res.status(400).json({ error: "party's name already taken" });
    } else {
      await new Party({ party: party }).save();

      res.json({ success: "Successfully added new partylist" });
    }
  })
);

router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateParty,
  catchAsync(async (req, res) => {
    let { party } = req.body;
    party = party.trim();

    const existingParty = await Party.findOne({
      party,
      _id: { $ne: req.params.id },
    });

    if (existingParty) {
      res.status(400).json({ error: "party's name already taken" });
    } else {
      await Party.findByIdAndUpdate(
        req.params.id,
        { party: party },
        {
          runValidators: true,
          new: true,
        }
      );

      res.json({ success: "Successfully updated partylist's name" });
    }
  })
);

// delete Party
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(async (req, res) => {
    await Party.findByIdAndDelete(req.params.id);

    res.json({ success: "Successfully removed partylist" });
  })
);

module.exports = router;
