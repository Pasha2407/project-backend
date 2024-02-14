const { contactModel } = require('../../models/contacts')
const newError = require('../../helpers/newError')

async function getById(req, res) {
    const { id } = req.params
    const result = await contactModel.findById(id)
    if (result === null) {
        throw newError(404)
    }
    res.status(200).json(result)
}

module.exports = getById