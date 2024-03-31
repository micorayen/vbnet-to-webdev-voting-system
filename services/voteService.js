const Candidate = require("../models/candidates");

async function getCandidates(position) {
  const candidates = await Candidate.find({
    position: position,
  });

  return candidates;
}

async function getCandidatesByPosition(req, res) {
  try {
    const presidents = await getCandidates("President");
    const vpInternals = await getCandidates("VP-Internal");
    const vpExternals = await getCandidates("VP-External");
    const auditors = await getCandidates("Auditor");
    const treasurers = await getCandidates("Treasurer");
    const secretaries = await getCandidates("Secretary");
    const pros = await getCandidates("PRO");
    const firstYearReps = await getCandidates("1st year representative");
    const secondYearReps = await getCandidates("2nd year representative");
    const thirdYearReps = await getCandidates("3rd year representative");
    const fourthYearReps = await getCandidates("4th year representative");

    return {
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
    };
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getCandidatesByPosition };
