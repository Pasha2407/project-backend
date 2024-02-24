const { ingredientEnModel, ingredientUaModel }
  = require("../../models/schemas/test-ingredient");

async function getIngredients(req, res) {
  const language = req.user.language;
  const ingredientModel = language === "en" ?
    ingredientEnModel : ingredientUaModel;

  const result = await ingredientModel.aggregate([
    {
      $group: {
        _id: "$title",
        ingredientId: { $first: "$_id" },
      },
    },
    {
      $project: {
        _id: 0,
        title: "$_id",
        ingredientId: 1,
      },
    },
    {
      $sort: { title: 1 },
    },
  ]);
  res.json(result);
}

module.exports = getIngredients;
