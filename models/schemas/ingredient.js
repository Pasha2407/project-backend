const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
    {
        title: {
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
