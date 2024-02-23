const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function getPopular(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const adult = req.user.adult;
  const limit = 4;

  const filter = {};
  if (!adult) {
    filter.alcoholic = language === "en" ?
      "Non alcoholic" : "Безалкогольний"
  }

  const result = await recipeModel
    .find({ ...filter })
    .sort({
      popularity: -1,
    })
    .limit(limit);

  res.json(result);
}

module.exports = getPopular;
