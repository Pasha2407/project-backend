const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function getCategories(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const result = await recipeModel.distinct("category");
  res.json(result);
}

module.exports = getCategories;
