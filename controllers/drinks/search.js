const { recipeEnModel, recipeUaModel }
  = require("../../models/schemas/test-recipe");

async function search(req, res) {
  const language = req.user.language;
  const recipeModel = language === "en" ?
    recipeEnModel : recipeUaModel;

  const { drink, category, ingredients, page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const adult = req.user.adult;
  const filter = {};

  if (!adult) {
    filter.alcoholic = language === "en" ?
      "Non alcoholic" : "Безалкогольний";
  }

  if (drink) {
    filter.drink = { $regex: new RegExp(drink, "i") };
  }

  if (category) {
    filter.category = category;
  }

  if (ingredients) {
    const ingredientsArray = ingredients.split(",");
    filter["ingredients.title"] = { $in: ingredientsArray };
  }

  const result = await recipeModel.find(filter);

  res.json(result.splice(skip, limit));
}

module.exports = search;
