const recipeModel = require("../../models/schemas/recipe");
const newError = require("../../helpers/newError");

async function removeMy(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    const myRecipe = await recipeModel.findOne({ _id: id, owner: userId });
    if (myRecipe === null) {
        throw newError(404);
    }

    await recipeModel.findByIdAndDelete(id);
    res.status(204).end();
}

module.exports = removeMy
