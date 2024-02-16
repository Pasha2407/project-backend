const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function getPopular(req, res) {
  const { adult } = await userModel.findById(req.user.id);
  let filter = {};
  if (!adult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const result = await recipeModel.find({ ...filter }).sort({
    popularity: -1,
  });

  res.json(result);
}

module.exports = getPopular;
