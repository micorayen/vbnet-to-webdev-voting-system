const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");
const { validateParty } = require("../middleware");

const parties = require("../controllers/parties");

// render Index
router.get("/", isLoggedIn, isAccountLoggedIn, catchAsync(parties.index));

// create Party
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateParty,
  catchAsync(parties.createParty)
);

router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateParty,
  catchAsync(parties.updateParty)
);

// delete Party
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(parties.deleteParty)
);

module.exports = router;
