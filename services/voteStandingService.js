const Candidate = require("../models/candidates");

async function getLeadingCandidatesByPosition(position) {
  const candidates = await Candidate.find({
    // party: "Digital Innovators Coalition",
    position: position,
  });

  // Sort the candidates by descending order of voteCount
  candidates.sort((a, b) => b.voteCount - a.voteCount);

  // Find candidates with the highest voteCount
  const maxVoteCount = Math.max(
    ...candidates.map((candidate) => candidate.voteCount)
  );
  const leadingCandidates = candidates.filter(
    (candidate) => candidate.voteCount === maxVoteCount
  );

  return leadingCandidates;
}

async function getVoteStandings(req, res) {
  try {
    const president = await getLeadingCandidatesByPosition("President");
    const vpInternal = await getLeadingCandidatesByPosition("VP-Internal");
    const vpExternal = await getLeadingCandidatesByPosition("VP-External");
    const auditor = await getLeadingCandidatesByPosition("Auditor");
    const treasurer = await getLeadingCandidatesByPosition("Treasurer");
    const secretary = await getLeadingCandidatesByPosition("Secretary");
    const pro = await getLeadingCandidatesByPosition("PRO");
    const firstYearRep = await getLeadingCandidatesByPosition(
      "1st year representative"
    );
    const secondYearRep = await getLeadingCandidatesByPosition(
      "2nd year representative"
    );
    const thirdYearRep = await getLeadingCandidatesByPosition(
      "3rd year representative"
    );
    const fourthYearRep = await getLeadingCandidatesByPosition(
      "4th year representative"
    );

    return {
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
    };
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getVoteStandings };
