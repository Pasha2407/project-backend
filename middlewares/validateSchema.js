function validateSchema(schema) {
    function validation(req, res, next) {
        const { error } = schema.validate(req.body)
        if (error) {
            error.status = 400
            return next(error)
        }
        next()
    }
    return validation
}

module.exports = validateSchema
