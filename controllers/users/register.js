const crypto = require('node:crypto')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const fs = require('node:fs')
const path = require('node:path')
const ejs = require('ejs')

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')
const sendEmail = require('../../helpers/sendEmail')

async function register(req, res) {
    const { email, password, subscription } = req.body
    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

    const user = await userModel.findOne({ email })
    if (user !== null) {
        throw newError(409)
    }
    const passwordHash = await bcrypt.hash(password, 8)

    const templatePath = path.join(__dirname, '..', '..', 'helpers/templateMessage.ejs')
    const template = fs.readFileSync(templatePath, 'utf8')
    const verifyToken = crypto.randomUUID()
    const htmlContent = ejs.render(template, { verifyToken })

    await sendEmail({
        to: email,
        from: 'pasha.khimchuk2@gmail.com',
        subject: 'Hello',
        html: htmlContent,
    })

    const result = await userModel.create({ email, password: passwordHash, subscription, avatarURL, verifyToken })

    const { subscription: subscriptionResponse } = result
    const userResponse = { email, subscription: subscriptionResponse }

    res.status(201).send({ user: userResponse, message: 'Email is not verified, go to your mailbox and confirm your mail' })
}

module.exports = register
