const { Party } = require("../models/additionals");

module.exports.index = async (req, res) => {
  const parties = await Party.find({});
  res.render("additionals/parties", { parties });
};

module.exports.createParty = async (req, res) => {
  let { party } = req.body;
  party = party.trim();

  const existingParty = await Party.findOne({ party: party });
  if (existingParty) {
    return res.status(400).json({ error: "party's name already taken" });
  }

  await new Party({ party: party }).save();
  res.json({ success: "Successfully added new partylist" });
};

module.exports.updateParty = async (req, res) => {
  let { party } = req.body;
  party = party.trim();

  const existingParty = await Party.findOne({
    party,
    _id: { $ne: req.params.id },
  });

  if (existingParty) {
    return res.status(400).json({ error: "party's name already taken" });
  }

  await Party.findByIdAndUpdate(
    req.params.id,
    { party: party },
    {
      runValidators: true,
      new: true,
    }
  );
  res.json({ success: "Successfully updated partylist's name" });
};

module.exports.deleteParty = async (req, res) => {
  await Party.findByIdAndDelete(req.params.id);

  res.json({ success: "Successfully removed partylist" });
};
