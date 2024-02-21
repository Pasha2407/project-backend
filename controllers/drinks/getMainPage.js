const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function getMainPage(req, res) {
  const { adult, signinCount, id, notificationShow } = req.user;
  const { limit = 3 } = req.query;
  const filter = {};

  if (!adult) {
    filter.alcoholic = "Non alcoholic";
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

    const categoryName = category.charAt(0).toLowerCase() + category.slice(1).replace(/\s+|\//g, '');
    drinks[category] = result;
    drinks[categoryName] = result;
    delete drinks[category];
  }

  if (notificationShow) {
    res.json({
      drinks,
      notification: `Wow! You have already visited us ${signinCount} times!`,
    });
    await userModel.findByIdAndUpdate(id, {
      notificationShow: false,
    });
  } else {
    res.json({ drinks });
  }
}

module.exports = getMainPage;
