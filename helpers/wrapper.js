function wrapper(method) {
    async function wrapperMethod(req, res, next) {
        try {
            await method(req, res, next)
        }
        catch (error) {
            next(error)
        }
    }
    return wrapperMethod
}

module.exports = wrapper