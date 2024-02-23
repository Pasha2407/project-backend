const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function removeFavorite(req, res) {
  const drinkId = req.params.id;
  const id = req.user.id;

  const recipe = await recipeEnModel.findById(drinkId);
  recipe.popularity -= 1;

  await recipeEnModel.findByIdAndUpdate(drinkId, {
    $pull: { favorite: id },
    popularity: recipe.popularity,
  });
  await recipeUaModel.findByIdAndUpdate(drinkId, {
    $pull: { favorite: id },
    popularity: recipe.popularity,
  });

  res.json({
    userId: id,
    drinkId: drinkId,
  });
}

module.exports = removeFavorite;
