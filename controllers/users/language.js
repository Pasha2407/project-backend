const userModel = require("../../models/schemas/user");

async function language(req, res) {
    const { language } = req.body;
    const id = req.user.id;
    const updatedLanguage = await userModel.findByIdAndUpdate(
        id, { language }, { new: true })

    res.json({
        language: updatedLanguage.language,
    });
}

module.exports = language;
