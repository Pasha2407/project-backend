const recipeModel = require("../../models/schemas/recipe");

async function getGlasses(req, res) {
  const result = await recipeModel.distinct("glass");
  res.json(result);
}

module.exports = getGlasses;
