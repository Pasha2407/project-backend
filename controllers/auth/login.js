const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../../models/schemas/user");
const { newError } = require("../../helpers");

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw newError(401, "Email or password is wrong");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw newError(401, "Email or password is wrong");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  user.signinCount = (user.signinCount || 0) + 1;

  const updatedUser = await userModel.findByIdAndUpdate(user._id, {
    signinCount: user.signinCount,
    token,
  });

  const userResponse = {
    name: updatedUser.name,
    avatarURL: updatedUser.avatarURL,
    signinCount: user.signinCount,
  };

  if (
    user.signinCount === 3 ||
    user.signinCount === 10 ||
    user.signinCount === 100
  ) {
    res
      .status(200)
      .send({
        user: userResponse,
        token,
        notification: `Wow! You have already visited us ${user.signinCount} times!`,
      });
  } else {
    res.status(200).send({ user: userResponse, token });
  }
}

module.exports = login;
