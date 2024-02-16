const Joi = require("joi");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const updateUserJoiSchema = Joi.object({
  name: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = { updateUserJoiSchema, emailSchema };
