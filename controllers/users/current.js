async function current(req, res) {
  const { email, id } = req.user;
  res.json({
    email: email,
    id: id,
  });
}

module.exports = current;
