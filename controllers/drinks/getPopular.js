async function getPopular(req, res) {
    res.status(200).send({
        message: 'route <getPopular> works'
    })
}

module.exports = getPopular
