const Candidate = require("../models/candidates");

const { getVoteStandings } = require("../services/voteStandingService");
const {
  candidatePositions,
} = require("../public/javascripts/tangentSelections");

module.exports.index = async (req, res) => {
  const candidates = await Candidate.find();

  const {
    president,
    vpInternal,
    vpExternal,
    auditor,
    treasurer,
    secretary,
    pro,
    firstYearRep,
    secondYearRep,
    thirdYearRep,
    fourthYearRep,
  } = await getVoteStandings();

  res.render("vote-standings", {
    candidatePositions,
    candidates,
    president,
    vpInternal,
    vpExternal,
    auditor,
    treasurer,
    secretary,
    pro,
    firstYearRep,
    secondYearRep,
    thirdYearRep,
    fourthYearRep,
  });
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
