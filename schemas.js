const Joi = require("joi");

module.exports.accountSchema = Joi.object({
  account: Joi.object({
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
    studentIdNumber: Joi.string().required(), // Change into Student IdNumber
    password: Joi.string(),
  }).required(),
});

module.exports.partySchema = Joi.object({
  party: Joi.string().required(),
});

module.exports.courseSchema = Joi.object({
  course: Joi.string().required(),
});

module.exports.titleSchema = Joi.object({
  title: Joi.string().required(),
});

module.exports.candidateSchema = Joi.object({
  candidate: Joi.object({
    candidateIdNumber: Joi.string().required(),
    party: Joi.string().required(),
    position: Joi.string().required(),
    fullName: Joi.string().required(),
    course: Joi.string().required(),
    yearLevel: Joi.string().required(),
    voteCount: Joi.string(),
  }).required(),
});
