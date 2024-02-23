const jwt = require("jsonwebtoken");
const userModel = require("../../models/schemas/user");
const { FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id, email } = req.user;

  const user = await userModel.findOne({ email });

  user.signinCount = (user.signinCount || 0) + 1;
  let notificationShow = false;
  if (
    user.signinCount === 3 ||
    user.signinCount === 10 ||
    user.signinCount === 100
  ) {
    notificationShow = true;
  }

  await user.save();

  const payload = {
    id,
    signinCount: user.signinCount,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  await userModel.findByIdAndUpdate(id, { token, notificationShow });

  res.redirect(`${FRONTEND_URL}?token=${token}`);
};

module.exports = googleAuth;
