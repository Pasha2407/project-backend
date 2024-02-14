async function getCategories(req, res) {
    res.status(200).send({
        message: 'route <getCategories> works'
    })
}

module.exports = getCategories
