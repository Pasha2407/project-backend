const recipeModel = require("../../models/schemas/recipe");

const { newError } = require("../../helpers");

async function getById(req, res) {
  const { id } = req.params;
  const adult = req.user.adult;
  const { alcoholic } = await recipeModel.findById(id);

  if (!adult && alcoholic === "Alcoholic") {
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
