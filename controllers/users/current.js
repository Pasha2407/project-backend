async function current(req, res) {
    res.status(200).send({
        message: 'route <current user> works'
    })
}

module.exports = current
