const recipeModel = require("../../models/schemas/recipe");

async function getMy(req, res) {
  const id = req.user.id;
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const result = await recipeModel.find({ owner: id });

  res.status(200).send({
    totalHits: result.length,
    data: result.splice(skip, limit),
  });
}

module.exports = getMy;
