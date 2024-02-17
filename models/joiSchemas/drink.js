const Joi = require('joi')

const ingredientsSchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': 'missing required title field',
        'string.base': 'field title must be a string'
    }),
    measure: Joi.string().required().messages({
        'any.required': 'missing required measure field',
        'string.base': 'field measure must be a string'
    }),
});

const addMyJoiSchema = Joi.object({
    drink: Joi.string().required().messages({
        'any.required': 'missing required drink field',
        'string.base': 'field drink must be a string'
    }),
    shortDescription: Joi.string().required().messages({
        'any.required': 'missing required shortDescription field',
        'string.base': 'field shortDescription must be a string'
    }),
    category: Joi.string().required().messages({
        'any.required': 'missing required category field',
        'string.base': 'field category must be a string'
    }),
    glass: Joi.string().required().messages({
        'any.required': 'missing required glass field',
        'string.base': 'field glass must be a string'
    }),
    alcoholic: Joi.string().required().messages({
        'any.required': 'missing required alcoholic field',
        'string.base': 'field alcoholic must be a string'
    }),
    ingredients: Joi.array().items(ingredientsSchema).required().messages({
        'any.required': 'missing required ingredients field',
        'string.base': 'field ingredients must be a array'
    }),
    instructions: Joi.string().required().messages({
        'any.required': 'missing required instructions field',
        'string.base': 'field instructions must be a string'
    }),
})

module.exports = { addMyJoiSchema }