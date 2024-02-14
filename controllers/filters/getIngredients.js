async function getIngredients(req, res) {
    res.status(200).send({
        message: 'route <getIngredients> works'
    })
}

module.exports = getIngredients
