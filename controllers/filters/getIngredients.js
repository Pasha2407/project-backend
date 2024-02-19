const ingredientModel = require("../../models/schemas/ingredient");

async function getIngredients(req, res) {
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
