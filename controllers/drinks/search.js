async function search(req, res) {
    res.status(200).send({
        message: 'route <search> works'
    })
}

module.exports = search
