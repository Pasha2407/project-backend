const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
        },
    },
    { versionKey: false }
)

const userModel = mongoose.model('User', userSchema)

const userJoiSchema = Joi.object({
    email: Joi.string().required().messages({
        'any.required': 'missing required email field',
        'string.base': 'field email must be a string'
    }),
    password: Joi.string().required().messages({
        'any.required': 'missing required password field',
        'string.base': 'field password must be a string'
    }),
})

module.exports = { userModel, userJoiSchema }