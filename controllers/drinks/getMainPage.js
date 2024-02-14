async function getMainPage(req, res) {
    res.status(200).send({
        message: 'route <getMainPage> works'
    })
}

module.exports = getMainPage
