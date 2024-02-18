const recipeModel = require("../../models/schemas/recipe");
const ingredientModel = require("../../models/schemas/ingredient");
const userModel = require("../../models/schemas/user");
const { newError } = require("../../helpers");

async function getById(req, res) {
  const { id } = req.params;
  const { adult } = await userModel.findById(req.user.id);
  const { alcoholic } = await recipeModel.findById(id);

  if (!adult && alcoholic === "Alcoholic") {
    throw newError(403, "Not Allowed");
  }
  const recipe = await recipeModel.findById(id);

  if (!recipe) {
    throw newError(404, "Not found");
  }

  const ingredients = [];
  for (const ingredientData of recipe.ingredients) {
    const ingredient = await ingredientModel.findById(
      ingredientData.ingredientId
    );

    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  res.json({
    recipe,
    ingredients,
  });
}

module.exports = getById;
