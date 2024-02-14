const path = require('node:path')

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function getAvatar(req, res) {
    const user = await userModel.findById(req.user.id)

    if (user === null) {
        throw newError(404)
    }
    if (user.avatarURL === null) {
        throw newError(404)
    }
    if (!user.avatarURL.startsWith('avatars')) {
        throw newError(404)
    }

    res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', user.avatarURL))
}

module.exports = getAvatar