async function current(req, res) {
    res.status(200).send({
        email: req.user.email,
        subscription: req.user.subscription
    })
}

module.exports = current
