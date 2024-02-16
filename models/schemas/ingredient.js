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

const ingredientModel = mongoose.model("ingredient", ingredientSchema);

module.exports = ingredientModel;
