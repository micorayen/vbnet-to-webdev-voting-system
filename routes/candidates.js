const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCandidate } = require("../middleware");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

const candidates = require("../controllers/candidates");

// Filter by party or position
router.get("/party/:party", catchAsync(candidates.filterByParty));

router.get("/position/:position", catchAsync(candidates.filterByPosition));

// render Index Form
router.get("/", isLoggedIn, isAccountLoggedIn, catchAsync(candidates.index));

// render New Form
router.get(
  "/new",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(candidates.renderNewForm)
);

// create Candidate
router.post(
  "/",
  isLoggedIn,
  isAccountLoggedIn,
  validateCandidate,
  catchAsync(candidates.createCandidate)
);

// render Show Form
router.get(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(candidates.renderShowForm)
);

// update Candidate
router.patch(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  validateCandidate,
  catchAsync(candidates.updateCandidate)
);

// delete Candidate
router.delete(
  "/:id",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(candidates.deleteCandidate)
);

// render Edit Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isAccountLoggedIn,
  catchAsync(candidates.renderEditForm)
);

module.exports = router;
