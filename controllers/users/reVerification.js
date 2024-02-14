const crypto = require('node:crypto')

const fs = require('node:fs')
const path = require('node:path')
const ejs = require('ejs')

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')
const sendEmail = require('../../helpers/sendEmail')

async function reVerification(req, res) {
    const { email } = req.body

    const user = await userModel.findOne({ email })
    if (user.verify === true) {
        throw newError(400, 'Verification has already been passed')
    }

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

    await userModel.findByIdAndUpdate(user._id, { verifyToken })

    res.status(200).send({ message: 'Verification email sent' })
}

module.exports = reVerification