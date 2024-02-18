const recipeModel = require("../../models/schemas/recipe");

async function getMy(req, res) {
  const id = req.user.id;
  const result = await recipeModel.find({ owner: id });

  res.status(200).send({ result });
}

module.exports = getMy;
