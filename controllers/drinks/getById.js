async function getById(req, res) {
    res.status(200).send({
        message: 'route <getById> works'
    })
}

module.exports = getById
