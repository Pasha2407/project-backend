const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");
const { newError } = require("../../helpers");

async function getById(req, res) {
  const { id } = req.params;
  const { adult } = await userModel.findById(req.user.id);
  if (!adult) {
    throw newError(403, "Not Allowed");
  }
  const result = await recipeModel.findById(id);
  if (!result) {
    throw newError(404, "Not found");
  }
  res.json(result);
}

module.exports = getById;
