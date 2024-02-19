const Joi = require("joi").extend(require("@joi/date"));

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
    "string.base": "field name must be a string",
  }),
  dateOfBirth: Joi.date().format("YYYY-MM-DD").required().messages({
    "any.required": "missing required date field",
    "date.format": "the date of birth field must be in the format YYYY-MM-DD",
  }),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
    "string.base": "field password must be a string",
  }),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
    "string.base": "field password must be a string",
  }),
});

module.exports = { registerJoiSchema, loginJoiSchema };
