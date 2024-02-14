// const { userModel } = require('../../models/users')
// const newError = require('../../helpers/newError')

async function sendSubscribe(req, res) {
    res.status(200).json({ message: 'route <sendSubscribe> works' })
}

module.exports = sendSubscribe