const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function getMainPage(req, res) {
  const { adult } = await userModel.findById(req.user.id);
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
