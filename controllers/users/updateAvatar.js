const fs = require('node:fs/promises')
const path = require('node:path')

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function updateAvatar(req, res) {
    await fs.rename(
        req.file.path,
        path.join(__dirname, '..', '..', 'public/avatars', req.file.filename)
    )

    const avatarURL = path.join('avatars', req.file.filename)
    const user = await userModel.findByIdAndUpdate(
        req.user.id,
        { avatarURL },
        { new: true }
    )

    if (user === null) {
        throw newError(404)
    }

    res.status(200).json({ avatarURL })
}

module.exports = updateAvatar 