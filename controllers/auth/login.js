const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function login(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (user === null) {
        throw newError(401, 'Email or password is wrong')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch === false) {
        throw newError(401, 'Email or password is wrong')
    }

    const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    await userModel.findByIdAndUpdate(user._id, { token })

    const userResponse = { email }

    res.status(200).send({ token, user: userResponse })
}

module.exports = login
