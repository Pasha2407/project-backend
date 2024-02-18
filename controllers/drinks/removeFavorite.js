const recipeModel = require("../../models/schemas/recipe");

async function removeFavorite(req, res) {
  const drinkId = req.params.id;
  const id = req.user.id;

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
