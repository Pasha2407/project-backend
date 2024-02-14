const mongoose = require('mongoose')
const Joi = require('joi')

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    { versionKey: false }
)

const contactModel = mongoose.model('Contact', contactSchema)

const contactJoiSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'missing required name field',
        'string.base': 'field name must be a string'
    }),
    email: Joi.string().required().messages({
        'any.required': 'missing required email field',
        'string.base': 'field email must be a string'
    }),
    phone: Joi.string().required().messages({
        'any.required': 'missing required phone field',
        'string.base': 'field phone must be a string'
    }),
    favorite: Joi.boolean().messages({
        'boolean.base': 'field favorite must be a boolean value'
    })
})

const favoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required(),
}).messages({
    'any.required': 'missing field favorite',
    'boolean.base': 'field favorite must be a boolean value',
})

module.exports = {
    contactModel,
    contactJoiSchema,
    favoriteJoiSchema,
}


