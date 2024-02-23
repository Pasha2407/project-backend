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
    email,
    signinCount: user.signinCount,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await userModel.findByIdAndUpdate(id, {
    accessToken,
    refreshToken,
    notificationShow,
  });

  res.redirect(
    `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = googleAuth;
