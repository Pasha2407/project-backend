const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");
const userModel = require("../../models/schemas/user");

async function getMainPage(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const { adult, signinCount, id, notificationShow } = req.user;
  const { limit = 3 } = req.query;
  const filter = {};

  if (!adult) {
    filter.alcoholic = language === "en" ?
      "Non alcoholic" : "Безалкогольний"
  }

  const drinksEn = {
    "Ordinary Drink": [],
    "Cocktail": [],
    "Shake": [],
    "Other / Unknown": [],
  };

  const drinksUa = {
    "Звичайний напій": [],
    "Коктейль": [],
    "Шейк": [],
    "Інше / Невідомо": [],
  };

  const drinks = language === "en" ? drinksEn : drinksUa;

  for (const category of Object.keys(drinks)) {
    const result = await recipeModel
      .find(
        { ...filter, category },
      )
      .sort({
        createdAt: -1,
      })
      .limit(limit);

    drinks[category] = result;
  }

  const notification = language === "en" ?
    `Wow! You have already visited us ${signinCount} times!` :
    `Вау! Ви вже були у нас ${signinCount} разів!`

  if (notificationShow) {
    res.json({
      drinks,
      notification,
    });
    await userModel.findByIdAndUpdate(id, {
      notificationShow: false,
    });
  } else {
    res.json({ drinks });
  }
}

module.exports = getMainPage;
