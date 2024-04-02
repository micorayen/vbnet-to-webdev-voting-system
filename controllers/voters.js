const { Course } = require("../models/additionals");
const Voter = require("../models/voters");
const { trimData } = require("../services/allService");

module.exports.index = async (req, res) => {
  const voters = await Voter.find({});
  res.render("voters/index", { voters });
};

module.exports.renderNewForm = async (req, res) => {
  const courses = await Course.find();

  res.render("voters/new", { courses });
};

module.exports.createVoter = async (req, res) => {
  const data = req.body.voter;
  const trimmedData = trimData(data);
  const { studentIdNumber, fullName, course, yearLevel, password } =
    trimmedData;

  const existingVoter = await Voter.findOne({
    $or: [{ studentIdNumber: studentIdNumber }, { fullName: fullName }],
  });

  if (existingVoter) {
    if (existingVoter.studentIdNumber === studentIdNumber) {
      return res
        .status(400)
        .json({ error: "ID Number already taken. Please choose another" });
    } else if (existingVoter.fullName === fullName) {
      return res
        .status(400)
        .json({ error: "Fullname already taken. Please choose another" });
    }
  }

  const voter = new Voter({ studentIdNumber, fullName, course, yearLevel });
  await Voter.register(voter, password);

  res.json({ success: "Successfully added new voter" });
};

module.exports.updateVoter = async (req, res) => {
  const data = req.body.voter;
  const trimmedData = trimData(data);
  const { studentIdNumber, fullName } = trimmedData;

  const existingUser = await Voter.findOne({
    $or: [{ studentIdNumber }, { fullName }],
    _id: { $ne: req.params.id },
  });

  if (existingUser) {
    if (existingUser.studentIdNumber === studentIdNumber) {
      return res
        .status(400)
        .json({ error: "ID Number already taken. Please choose another" });
    } else if (existingUser.fullName === fullName) {
      return res
        .status(400)
        .json({ error: "Fullname already taken. Please choose another" });
    }
  }

  await Voter.findByIdAndUpdate(
    req.params.id,
    { ...trimmedData },
    { runValidators: true, new: true }
  );

  res.json({ success: "Successfully updated voter's information" });
};

module.exports.deleteVoter = async (req, res) => {
  const { id } = req.params;
  await Voter.findByIdAndDelete(id);

  req.flash("success", "Successfully deleted voter");
  res.redirect("/voters");
};

module.exports.renderEditForm = async (req, res) => {
  const courses = await Course.find();

  const voter = await Voter.findById(req.params.id);

  if (!voter) {
    req.flash("error", "Cannot find voter's information");
    return res.redirect("/voters");
  }

  res.render("voters/edit", { voter, courses });
};

// module.exports
// module.exports
