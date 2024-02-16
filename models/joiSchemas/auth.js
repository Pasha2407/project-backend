const Joi = require('joi').extend(require('@joi/date'))

const registerJoiSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'missing required name field',
        'string.base': 'field name must be a string'
    }),
    dateOfBirth: Joi.date().format('YYYY-MM-DD').required().messages({
        'any.required': 'missing required date field',
        'date.format': 'the date of birth field must be in the format YYYY-MM-DD'
    }),
    email: Joi.string().required().messages({
        'any.required': 'missing required email field',
        'string.base': 'field email must be a string'
    }),
    password: Joi.string().required().messages({
        'any.required': 'missing required password field',
        'string.base': 'field password must be a string'
    }),
})

const loginJoiSchema = Joi.object({
    email: Joi.string().required().messages({
        'any.required': 'missing required email field',
        'string.base': 'field email must be a string'
    }),
    password: Joi.string().required().messages({
        'any.required': 'missing required password field',
        'string.base': 'field password must be a string'
    }),
})

module.exports = { registerJoiSchema, loginJoiSchema }

