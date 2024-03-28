function trimCandidateData(candidateData) {
  const trimmedCandidateData = {};
  for (const key in candidateData) {
    if (typeof candidateData[key] === "string") {
      trimmedCandidateData[key] = candidateData[key].trim();
    } else {
      trimmedCandidateData[key] = candidateData[key];
    }
  }
  return trimmedCandidateData;
}

module.exports = {
  trimCandidateData,
};
