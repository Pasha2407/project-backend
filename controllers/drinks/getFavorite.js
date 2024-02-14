async function getFavorite(req, res) {
    res.status(200).send({
        message: 'route <getFavorite> works'
    })
}

module.exports = getFavorite
