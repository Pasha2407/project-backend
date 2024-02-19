const recipeModel = require("../../models/schemas/recipe");

async function getMainPage(req, res) {
  const adult = req.user.adult;
  const { limit = 3 } = req.query;
  let filter = {};

  if (!adult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const drinks = {
    "Ordinary Drink": [],
    Cocktail: [],
    Shake: [],
    "Other/Unknown": [],
  };

  for (const category of Object.keys(drinks)) {
    const result = await recipeModel
      .find(
        { ...filter, category },
        "-instructionsES -instructionsDE -instructionsFR -instructionsIT  -instructionsPL -instructionsRU -instructionsUK"
      )
      .sort({
        createdAt: -1,
      })
      .limit(limit);

    drinks[category] = result;
  }

  res.json(drinks);
}

module.exports = getMainPage;
