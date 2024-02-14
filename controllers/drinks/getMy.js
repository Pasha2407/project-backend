async function getMy(req, res) {
    res.status(200).send({
        message: 'route <getMy> works'
    })
}

module.exports = getMy
