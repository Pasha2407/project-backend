const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function addFavorite(req, res) {
  const { id } = await userModel.findById(req.user.id);
  const { drinkId } = req.body;

  const recipe = await recipeModel.findById(drinkId);

  if (!recipe.popularity) {
    recipe.popularity = 1;
  } else {
    recipe.popularity += 1;
  }
  await recipeModel.findByIdAndUpdate(drinkId, {
    $push: { favorite: id },
    popularity: recipe.popularity,
  });

  res.json({
    userId: id,
    drinkId: drinkId,
  });
}

module.exports = addFavorite;
