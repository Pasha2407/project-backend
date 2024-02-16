const recipeModel = require("../../models/schemas/recipe");

async function getIngredients(req, res) {
  const result = await recipeModel.distinct("ingredients.title");
  res.json(result);
}

module.exports = getIngredients;
