const ingredientModel = require("../../models/schemas/ingredient");

async function getIngredients(req, res) {
  const result = await ingredientModel.distinct("title");
  res.json(result);
}

module.exports = getIngredients;
