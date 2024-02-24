const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function getMy(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const id = req.user.id;
  const result = await recipeModel.find({ owner: id });

  res.status(200).send({ result });
}

module.exports = getMy;
