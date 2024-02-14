async function getGlasses(req, res) {
    res.status(200).send({
        message: 'route <getGlasses> works'
    })
}

module.exports = getGlasses
