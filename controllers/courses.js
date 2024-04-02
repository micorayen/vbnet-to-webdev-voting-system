const { Course } = require("../models/additionals");

module.exports.index = async (req, res) => {
  const courses = await Course.find();
  res.render("additionals/courses", { courses });
};

module.exports.createCourse = async (req, res) => {
  let { course } = req.body;
  course = course.trim();

  const existingCourse = await Course.findOne({ course: course });
  if (existingCourse) {
    return res.status(400).json({ error: "academic's course already exist" });
  }

  await new Course({ course: course }).save();
  res.json({ success: "Successfully added new academic course" });
};

module.exports.updateCourse = async (req, res) => {
  let { course } = req.body;
  course = course.trim();

  const existingCourse = await Course.findOne({
    course,
    _id: { $ne: req.params.id },
  });
  if (existingCourse) {
    return res.status(400).json({ error: "academic's course already exist" });
  }

  await Course.findByIdAndUpdate(
    req.params.id,
    { course: course },
    {
      runValidators: true,
      new: true,
    }
  );
  res.json({ success: "Successfully updated academic course's name" });
};

module.exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);

  res.json({ success: "Successfully removed academic course" });
};
