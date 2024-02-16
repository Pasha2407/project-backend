const recipeModel = require("../../models/schemas/recipe");

async function getCategories(req, res) {
  const result = await recipeModel.distinct("category");
  res.json(result);
}

module.exports = getCategories;
