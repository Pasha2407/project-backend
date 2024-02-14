const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function updateSubscription(req, res) {
    const userId = req.user.id
    const { subscription } = req.body

    const result = await userModel.findByIdAndUpdate(userId, { subscription }, { new: true })

    if (result === null) {
        throw newError(404)
    }
    res.status(200).json({ subscription })
}

module.exports = updateSubscription