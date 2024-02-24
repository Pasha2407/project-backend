const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ingredientThumb: {
      type: String,
    },
    "thumb-medium": {
      type: String,
    },
    "thumb-small": {
      type: String,
    },
    abv: {
      type: String,
    },
    alcohol: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    flavour: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ingredientEnModel = mongoose.model("en-ingredient", ingredientSchema);
const ingredientUaModel = mongoose.model("ua-ingredient", ingredientSchema);

module.exports = { ingredientEnModel, ingredientUaModel }
