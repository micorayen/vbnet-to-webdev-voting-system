function trimData(data) {
  const trimmedData = {};
  for (const key in data) {
    if (typeof data[key] === "string") {
      trimmedData[key] = data[key].trim();
    } else {
      trimmedData[key] = data[key];
    }
  }
  return trimmedData;
}

module.exports = {
  trimData,
};
