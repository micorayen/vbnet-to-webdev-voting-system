function trimVoterData(voterData) {
  const trimmedVoterData = {};
  for (const key in voterData) {
    if (typeof voterData[key] === "string") {
      trimmedVoterData[key] = voterData[key].trim();
    } else {
      trimmedVoterData[key] = voterData[key];
    }
  }
  return trimmedVoterData;
}

module.exports = {
  trimVoterData,
};
