const Joi = require("joi");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const updateUserJoiSchema = Joi.object({
  name: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
});

const languageList = ["en", "ua"];

const languageJoiSchema = Joi.object({
  language: Joi.string().valid(...languageList).required().messages({
    "any.required": "missing required language field",
    "string.base": "field language must be a string",
    "valid.base": "field language must be one of: " + languageList,
  }),
});

module.exports = { updateUserJoiSchema, emailSchema, languageJoiSchema };
