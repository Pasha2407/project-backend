const { contactModel } = require('../../models/contacts')

async function getAll(req, res) {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit

    const query = {}

    const favorite = req.query.favorite
    if (favorite === 'true') {
        query.favorite = true
    } else if (favorite === 'false') {
        query.favorite = false
    }

    const userId = req.user.id
    const owner = req.query.owner
    if (owner === 'true') {
        query.owner = userId
    }

    const result = await contactModel.find(query).skip(startIndex).limit(limit)
    res.status(200).json(result)
}

module.exports = getAll