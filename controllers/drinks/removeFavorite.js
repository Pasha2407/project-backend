const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function removeFavorite(req, res) {
  const { id } = await userModel.findById(req.user.id);
  const { drinkId } = req.body;
  const recipe = await recipeModel.findById(drinkId);
  recipe.popularity -= 1;

  await recipeModel.findByIdAndUpdate(drinkId, {
    $pull: { favorite: id },
    popularity: recipe.popularity,
  });

  res.json({
    userId: id,
    drinkId: drinkId,
  });
}

module.exports = removeFavorite;
