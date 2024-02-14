const { contactModel } = require('../../models/contacts')
const newError = require('../../helpers/newError')

async function update(req, res) {
    const { id } = req.params
    const result = await contactModel.findByIdAndUpdate(id, req.body, { new: true })
    if (result === null) {
        throw newError(404)
    }
    res.status(200).json(result)
}

module.exports = update