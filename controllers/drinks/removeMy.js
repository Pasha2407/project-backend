const { recipeEnModel, recipeUaModel }
    = require("../../models/schemas/test-recipe");
const newError = require("../../helpers/newError");

async function removeMy(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    const myRecipe = await recipeEnModel.findOne({ _id: id, owner: userId });
    if (!myRecipe) {
        throw newError(404, "Drink not found");
    }

    await recipeEnModel.findByIdAndDelete(id);
    await recipeUaModel.findByIdAndDelete(id);
    res.status(204).end();
}

module.exports = removeMy
