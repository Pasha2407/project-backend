const recipeModel = require("../../models/schemas/recipe");

async function addFavorite(req, res) {
  const id = req.user.id;
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

  const favoriteCount = await recipeModel.find({ favorite: id });

  if (
    favoriteCount.length === 3 ||
    favoriteCount.length === 10 ||
    favoriteCount.length === 100
  ) {
    res.json({
      userId: id,
      drinkId: drinkId,
      notification: `Wow! You have added the ${favoriteCount.length} recipes to your favorites!`,
    });
  } else {
    res.json({
      userId: id,
      drinkId: drinkId,
    });
  }
}

module.exports = addFavorite;
