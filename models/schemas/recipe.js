const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    drink: {
      type: String,
    },
    drinkAlternate: {
      type: String,
      default: 'Sorry, not specified'
    },
    tags: {
      type: String,
    },
    video: {
      type: String,
    },
    category: {
      type: String,
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
    },
    glass: {
      type: String,
    },
    description: {
      type: String,
    },
    instructions: {
      type: String,
    },
    instructionsES: {
      type: String,
    },
    instructionsDE: {
      type: String,
    },
    instructionsFR: {
      type: String,
    },
    instructionsIT: {
      type: String,
    },
    instructionsRU: {
      type: String,
    },
    instructionsPL: {
      type: String,
    },
    instructionsUK: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: {
      type: Array,
      title: {
        type: String,
      },
      measure: {
        type: String,
      },
      ingredientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ingredient",
      },
    },
    favorite: {
      type: Array,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    shortDescription: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;
