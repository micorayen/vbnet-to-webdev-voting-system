const Joi = require("joi");

module.exports.userSchema = Joi.object({
  user: Joi.object({
    role: Joi.string().required(),
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string(),
  }).required(),
});
