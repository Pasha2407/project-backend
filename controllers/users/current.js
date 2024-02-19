async function current(req, res) {
  const { email, id, name, adult, subscribed } = req.user;
  res.json({
    id: id,
    name: name,
    email: email,
    adult: adult,
    subscribed: subscribed,
  });
}

module.exports = current;
