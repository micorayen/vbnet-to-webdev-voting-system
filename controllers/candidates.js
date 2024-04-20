const { cloudinary } = require("../cloudinary");

const Candidate = require("../models/candidates");
const {
  candidatePositions,
} = require("../public/javascripts/tangentSelections");
const { Party, Course } = require("../models/additionals");
const { trimData } = require("../services/allService");

// FILTER BY PARTY & POSITION
module.exports.filterByParty = async (req, res) => {
  if (req.params.party === "0") {
    const candidates = await Candidate.find();
    res.json(candidates);
  } else {
    const filterByParty = await Candidate.find({ party: req.params.party });
    res.json(filterByParty);
  }
};

module.exports.filterByPosition = async (req, res) => {
  if (req.params.position === "0") {
    const candidates = await Candidate.find();
    res.json(candidates);
  } else {
    const filterByPosition = await Candidate.find({
      position: req.params.position,
    });
    res.json(filterByPosition);
  }
};

// INDEX
module.exports.index = async (req, res) => {
  const parties = await Party.find();
  const candidates = await Candidate.find();
  res.render("candidates", { parties, candidatePositions, candidates });
};

// RENDER NEW FORM
module.exports.renderNewForm = async (req, res) => {
  const parties = await Party.find();
  const courses = await Course.find();
  res.render("candidates/new", { parties, candidatePositions, courses });
};

// CREATE NEW CANDIDATE
module.exports.createCandidate = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const data = req.body.candidate;
  const trimmedData = trimData(data);
  const { candidateIdNumber, party, position, fullName } = trimmedData;

  const existingCandidate = await Candidate.findOne({
    $or: [
      { candidateIdNumber: candidateIdNumber },
      { $and: [{ party: party }, { position: position }] },
      { fullName: fullName },
    ],
  });

  if (existingCandidate) {
    if (existingCandidate.candidateIdNumber === candidateIdNumber) {
      return res
        .status(400)
        .json({ error: "ID Number already taken. Please choose another" });
    } else if (
      existingCandidate.party === party &&
      existingCandidate.position === position
    ) {
      return res.status(400).json({
        error: `${existingCandidate.position} position for party - ${existingCandidate.party} have already been taken`,
      });
    } else if (existingCandidate.fullName === fullName) {
      return res
        .status(400)
        .json({ error: "Fullname already taken. Please choose another" });
    }
  }

  const img = req.file;

  const candidateData = {
    ...trimmedData,
    image: {
      url: img.path,
      filename: img.filename,
    },
  };

  const candidate = new Candidate(candidateData);
  await candidate.save();

  res.json({ success: "Successfully added new candidate" });
};

// RENDER SHOW FORM
module.exports.renderShowForm = async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    req.flash("error", "Cannot find candidate's information");
    console.log("Cannot find that candidate");
    return res.redirect("/candidates");
  }
  res.render("candidates/show", { candidate });
};

// UPDDATE CANDIDATE INFORMATION
module.exports.updateCandidate = async (req, res) => {
  console.log("reached route", req.file);

  const data = req.body.candidate;
  const trimmedData = trimData(data);
  const { candidateIdNumber, party, position, fullName } = trimmedData;

  const existingCandidate = await Candidate.findOne({
    $or: [
      { candidateIdNumber: candidateIdNumber },
      { $and: [{ party: party }, { position: position }] },
      { fullName: fullName },
    ],
    _id: { $ne: req.params.id },
  });

  if (existingCandidate) {
    if (existingCandidate.candidateIdNumber === candidateIdNumber) {
      return res
        .status(400)
        .json({ error: "ID Number already taken. Please choose another" });
    } else if (
      existingCandidate.party === party &&
      existingCandidate.position === position
    ) {
      return res.status(400).json({
        error: `${existingCandidate.position} position for party - ${existingCandidate.party} have already been taken`,
      });
    } else if (existingCandidate.fullName === fullName) {
      return res
        .status(400)
        .json({ error: "Fullname already taken. Please choose another" });
    }
  }

  const candidate = await Candidate.findById(req.params.id);

  if (req.file) {
    await cloudinary.uploader.destroy(candidate.image.filename);
    candidate.image = null;

    // const result = await cloudinary.uploader.upload(req.file.path);
    const img = req.file;
    candidate.image = {
      url: img.path,
      filename: img.filename,
    };
  }

  // Update the candidate document with the provided data, excluding the image field
  Object.assign(candidate, trimmedData);

  // Save the updated candidate document
  await candidate.save();

  res.json({ success: "Successfully updated candidate's information" });
};

// DELETE CANDIDATE
module.exports.deleteCandidate = async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    req.flash("error", "Candidate not found");
    return res.redirect("/candidates");
  }

  await cloudinary.uploader.destroy(candidate.image.filename);
  await Candidate.findByIdAndDelete(req.params.id);

  req.flash("success", "Successfully removed candidate");
  res.redirect("/candidates");
};

// RENDER EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    req.flash("error", "Cannot find candidate's information");
    return res.redirect("/candidates");
  }

  const parties = await Party.find();
  const courses = await Course.find();

  res.render("candidates/edit", {
    candidate,
    parties,
    candidatePositions,
    courses,
  });
};
