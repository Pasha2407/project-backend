const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function verifyEmail(req, res) {
    const { verifyToken } = req.params

    const user = await userModel.findOne({
        verifyToken
    })

    if (user === null) {
        throw newError(404)
    }

    await userModel.findByIdAndUpdate(user._id, {
        verify: true,
        verifyToken: null
    })

    res.status(200).send({ message: 'Verification successful' })
}

module.exports = verifyEmail