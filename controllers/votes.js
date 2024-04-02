const Candidate = require("../models/candidates");
const Voter = require("../models/voters");

const { getCandidatesByPosition } = require("../services/voteService");

module.exports.index = async (req, res) => {
  const loggedInVoter = req.user;
  const {
    presidents,
    vpInternals,
    vpExternals,
    auditors,
    treasurers,
    secretaries,
    pros,
    firstYearReps,
    secondYearReps,
    thirdYearReps,
    fourthYearReps,
  } = await getCandidatesByPosition();

  res.render("votes", {
    loggedInVoter,
    presidents,
    vpInternals,
    vpExternals,
    auditors,
    treasurers,
    secretaries,
    pros,
    firstYearReps,
    secondYearReps,
    thirdYearReps,
    fourthYearReps,
  });
};

module.exports.updateVoteCount = async (req, res) => {
  await Candidate.updateMany(
    { fullName: { $in: Object.values(req.body) } },
    { $inc: { voteCount: 1 } }
  );

  // console.log(req.user.fullName);
  await Voter.findOneAndUpdate(
    { fullName: req.user.fullName },
    { $set: { voteStatus: "Voted" } },
    { new: true }
  );

  res.redirect("/logout");
};
