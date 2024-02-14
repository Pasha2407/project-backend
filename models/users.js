const mongoose = require('mongoose')
const Joi = require('joi')

const subscriptionEnum = ['starter', 'pro', 'business']

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
        subscription: {
            type: String,
            enum: subscriptionEnum,
            default: 'starter'
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verifyToken: {
            type: String,
            required: true,
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
    subscription: Joi.string().valid(...subscriptionEnum).messages({
        'any.only': 'Subscription must be one of {#valids}',
        'string.base': 'field subscription must be a string'
    }),
})

const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string().required().valid(...subscriptionEnum)
}).messages({
    'any.only': 'Subscription must be one of {#valids}',
    'string.base': 'field subscription must be a string'
})

const verifyEmailJoiSchema = Joi.object({
    email: Joi.string().required()
}).messages({
    'any.required': 'missing required email field',
    'string.base': 'field email must be a string'
})

module.exports = {
    userModel,
    userJoiSchema,
    subscriptionJoiSchema,
    verifyEmailJoiSchema,
}