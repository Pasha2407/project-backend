const userModel = require("../../models/schemas/user");

async function logout(req, res) {
  await userModel.findByIdAndUpdate(req.user.id, {
    accessToken: null,
    refreshToken: null,
  });
  res.status(204).end();
}

module.exports = logout;
