const Joi = require("joi");

const categoriesList = [
  "Beer",
  "Cocktail",
  "Cocoa",
  "Coffee / Tea",
  "Homemade Liqueur",
  "Ordinary Drink",
  "Other/Unknown",
  "Punch / Party Drink",
  "Shake",
  "Shot",
  "Soft Drink",
];
const glassesList = [
  "Balloon Glass",
  "Beer Glass",
  "Beer Mug",
  "Beer Pilsner",
  "Brandy Snifter",
  "Champagne Flute",
  "Cocktail Glass",
  "Coffee Mug",
  "Collins Glass",
  "Copper Mug",
  "Cordial Glass",
  "Coupe Glass",
  "Highball Glass",
  "Hurricane glass",
  "Irish Coffee Cup",
  "Jar",
  "Margarita Glass",
  "Margarita/Coupette glass",
  "Martini Glass",
  "Mason Jar",
  "Nick and Nora Glass",
  "Old-Fashioned Glass",
  "Pint Glass",
  "Pitcher",
  "Pousse Cafe Glass",
  "Punch Bowl",
  "Shot Glass",
  "Whiskey Glass",
  "Whiskey Sour Glass",
  "White Wine Glass",
  "Wine Glass",
];

const alcoholicList = ["Alcoholic", "Non alcoholic"];

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
    .valid(...categoriesList)
    .required()
    .messages({
      "any.required": "missing required category field",
      "string.base": "field category must be a string",
      "valid.base": "field category must be one of: " + categoriesList,
    }),
  glass: Joi.string()
    .valid(...glassesList)
    .required()
    .messages({
      "any.required": "missing required glass field",
      "string.base": "field glass must be a string",
      "valid.base": "field glass must be one of: " + glassesList,
    }),
  alcoholic: Joi.string()
    .valid(...alcoholicList)
    .required()
    .messages({
      "any.required": "missing required alcoholic field",
      "string.base": "field alcoholic must be a string",
      "valid.base": "field alcoholic must be Alcoholic or Non alcoholic",
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
