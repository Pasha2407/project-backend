const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function addFavorite(req, res) {
  const language = req.user.language;
  const id = req.user.id;
  const { drinkId } = req.body;

  const recipe = await recipeEnModel.findById(drinkId);

  if (!recipe.popularity) {
    recipe.popularity = 1;
  } else {
    recipe.popularity += 1;
  }

  await recipeEnModel.findByIdAndUpdate(drinkId, {
    $push: { favorite: id },
    popularity: recipe.popularity,
  });
  await recipeUaModel.findByIdAndUpdate(drinkId, {
    $push: { favorite: id },
    popularity: recipe.popularity,
  });

  const favoriteCount = await recipeEnModel.find({ favorite: id });

  const notification = language === "en" ?
    `Wow! You have added the ${favoriteCount.length} recipes to your favorites!` :
    `Вау! Ви додали ${favoriteCount.length} рецептів до своїх улюблених!`;

  if (
    favoriteCount.length === 3 ||
    favoriteCount.length === 10 ||
    favoriteCount.length === 100
  ) {
    res.json({
      userId: id,
      drinkId: drinkId,
      notification,
    });
  } else {
    res.json({
      userId: id,
      drinkId: drinkId,
    });
  }
}

module.exports = addFavorite;
