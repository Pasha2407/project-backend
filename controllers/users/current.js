async function current(req, res) {
  const { email, id, name, adult, subscribed, avatarURL } = req.user;
  res.json({
    id: id,
    name: name,
    email: email,
    adult: adult,
    subscribed: subscribed,
    avatarURL: avatarURL,
  });
}

module.exports = current;
