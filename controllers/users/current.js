async function current(req, res) {
  const { email, id, name, adult, subscribed, avatarURL, dateOfBirth } =
    req.user;
  res.json({
    id: id,
    name: name,
    email: email,
    adult: adult,
    subscribed: subscribed,
    avatarURL: avatarURL,
    dateOfBirth: dateOfBirth,
  });
}

module.exports = current;
