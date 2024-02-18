const recipeModel = require("../../models/schemas/recipe");

async function getFavorite(req, res) {
  const id = req.user.id;
  const result = await recipeModel.find({ favorite: id });
  res.json({
    userId: id,
    data: result,
  });
}

module.exports = getFavorite;
