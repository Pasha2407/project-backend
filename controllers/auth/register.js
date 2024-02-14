const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function register(req, res) {
    const { email, password } = req.body
    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

    const user = await userModel.findOne({ email })
    if (user !== null) {
        throw newError(409)
    }
    const passwordHash = await bcrypt.hash(password, 8)

    await userModel.create({ email, password: passwordHash, avatarURL })

    const userResponse = { email }

    res.status(201).send({ user: userResponse })
}

module.exports = register
