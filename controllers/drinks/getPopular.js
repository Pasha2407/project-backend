const recipeModel = require("../../models/schemas/recipe");

async function getPopular(req, res) {
  const adult = req.user.adult;

  const limit = 4;

  const filter = { owner: null };
  if (!adult) {
    filter.alcoholic = "Non alcoholic";
  }

  const result = await recipeModel
    .find({ ...filter })
    .sort({
      popularity: -1,
    })
    .limit(limit);

  res.json(result);
}

module.exports = getPopular;
