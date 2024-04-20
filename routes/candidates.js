const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { validateCandidate } = require("../middleware");
const { isLoggedIn, isAccountLoggedIn } = require("../middleware");

// Cloudinary - For Images
const MAX_FILE_SIZE_BYTES = 150 * 1024; // 150 KB
const { cloudinary } = require("../cloudinary");
const multer = require("multer");
const { storage } = require("../cloudinary"); //node, automatically looks  to 'index.js'
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});
// const upload = multer({ dest: "uploads/" });
const candidates = require("../controllers/candidates");
const Candidate = require("../models/candidates");
const { trimData } = require("../services/allService");
const uploadCandidateImage = upload.single("image");

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
  uploadCandidateImage,
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
  uploadCandidateImage,
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

// ===================================
// Middleware to check for new candidate duplicates
