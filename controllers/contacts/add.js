const { contactModel } = require('../../models/contacts')

async function add(req, res) {
    const { name, email, phone, favorite } = req.body
    const newContact = {
        name,
        email,
        phone,
        favorite,
        owner: req.user.id
    }
    const result = await contactModel.create(newContact)
    res.status(201).json(result)
}

module.exports = add
