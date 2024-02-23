const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function getGlasses(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const result = await recipeModel.distinct("glass");
  res.json(result);
}

module.exports = getGlasses;
