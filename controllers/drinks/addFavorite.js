async function addFavorite(req, res) {
    res.status(200).send({
        message: 'route <addFavorite> works'
    })
}

module.exports = addFavorite
