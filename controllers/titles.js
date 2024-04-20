const { Title } = require("../models/additionals");

module.exports.updateTitle = async (req, res) => {
  await Title.findOneAndUpdate(
    {},
    { title: req.body.title }, // Update the title
    { runValidators: true, new: true }
  );

  req.flash("success", "Successfully updated application's title");
  res.redirect("/");
};
