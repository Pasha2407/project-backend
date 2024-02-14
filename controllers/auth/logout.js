const { userModel } = require('../../models/users')

async function logout(req, res) {
    await userModel.findByIdAndUpdate(req.user.id, { token: null })
    res.status(204).end()
}

module.exports = logout
