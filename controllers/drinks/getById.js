const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

const { newError } = require("../../helpers");

async function getById(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const { id } = req.params;
  const adult = req.user.adult;
  const { alcoholic } = await recipeModel.findById(id);

  if (!adult && language === "en" && alcoholic === "Alcoholic") {
    throw newError(403, "Not Allowed");
  }
  if (!adult && language === "ua" && alcoholic === "Алкогольний") {
    throw newError(403, "Not Allowed");
  }

  const recipe = await recipeModel
    .findById(id)
    .populate("ingredients.ingredientId");

  if (!recipe) {
    throw newError(404, "Not found");
  }

  res.json({
    recipe,
  });
}

module.exports = getById;
