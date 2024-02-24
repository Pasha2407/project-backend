const Joi = require("joi");

const { categoriesList, glassesList, alcoholicList,
  categoriesUaList, glassesUaList, alcoholicUaList }
  = require("../../helpers/drinkLists")

const addMyJoiSchema = Joi.object({
  drink: Joi.string().required().messages({
    "any.required": "missing required drink field",
    "string.base": "field drink must be a string",
  }),
  shortDescription: Joi.string().required().messages({
    "any.required": "missing required shortDescription field",
    "string.base": "field shortDescription must be a string",
  }),
  category: Joi.string()
    .valid(...categoriesList, ...categoriesUaList)
    .required()
    .messages({
      "any.required": "missing required category field",
      "string.base": "field category must be a string",
      "valid.base": "field category must be one of: " +
        categoriesList + " or " + categoriesUaList,
    }),
  glass: Joi.string()
    .valid(...glassesList, ...glassesUaList)
    .required()
    .messages({
      "any.required": "missing required glass field",
      "string.base": "field glass must be a string",
      "valid.base": "field glass must be one of: " +
        glassesList + " or " + glassesUaList,
    }),
  alcoholic: Joi.string()
    .valid(...alcoholicList, ...alcoholicUaList)
    .required()
    .messages({
      "any.required": "missing required alcoholic field",
      "string.base": "field alcoholic must be a string",
      "valid.base": "field alcoholic must be Alcoholic (Алкогольний) or Non alcoholic (Безалкогольний)",
    }),
  ingredients: Joi.string().required().messages({
    "any.required": "missing required ingredients field",
    "string.base": "field ingredients must be a array",
  }),
  instructions: Joi.string().required().messages({
    "any.required": "missing required instructions field",
    "string.base": "field instructions must be a string",
  }),
});

module.exports = { addMyJoiSchema };
