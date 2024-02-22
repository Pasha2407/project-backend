const recipeModel = require("../../models/schemas/recipe");

async function getFavorite(req, res) {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const id = req.user.id;
  const result = await recipeModel.find({ favorite: id });
  res.json({
    userId: id,
    data: result.splice(skip, limit),
  });
}

module.exports = getFavorite;
