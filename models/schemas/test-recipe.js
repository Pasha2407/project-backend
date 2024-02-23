const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        drink: {
            type: String,
        },
        drinkAlternate: {
            type: String,
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
        drinkThumb: {
            type: String,
        },
        ingredients: [
            {
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
        ],
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

const recipeEnModel = mongoose.model("recipes-en", recipeSchema);
const recipeUaModel = mongoose.model("recipes-ua", recipeSchema);

module.exports = { recipeEnModel, recipeUaModel }
