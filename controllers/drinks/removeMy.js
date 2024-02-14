async function removeMy(req, res) {
    res.status(200).send({
        message: 'route <removeMy> works'
    })
}

module.exports = removeMy
