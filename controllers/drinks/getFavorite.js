const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function getFavorite(req, res) {
  const { id } = await userModel.findById(req.user.id);
  const result = await recipeModel.find({ favorite: id });
  res.json({
    userId: id,
    data: result,
  });
}

module.exports = getFavorite;
