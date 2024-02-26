const Joi = require("joi");

module.exports.userSchema = Joi.object({
  user: Joi.object({
    role: Joi.string().required(),
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string(),
  }).required(),
});

module.exports.voterSchema = Joi.object({
  voter: Joi.object({
    voteStatus: Joi.string(),
    fullName: Joi.string().required(),
    course: Joi.string().required(),
    yearLevel: Joi.string().required(),
    username: Joi.string().required(), // Change into Student IdNumber
    password: Joi.string(),
  }).required(),
});

module.exports.partySchema = Joi.object({
  party: Joi.string().required(),
});

module.exports.courseSchema = Joi.object({
  course: Joi.string().required(),
});
