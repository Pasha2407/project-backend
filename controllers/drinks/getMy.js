const recipeModel = require("../../models/schemas/recipe");
const userModel = require("../../models/schemas/user");

async function getMy(req, res) {
    const { id } = await userModel.findById(req.user.id);
    const result = await recipeModel.find({ owner: id });

    res.status(200).send({ result })
}

module.exports = getMy
