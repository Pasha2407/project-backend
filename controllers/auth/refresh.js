const jwt = require("jsonwebtoken");

const userModel = require("../../models/schemas/user");

const { newError } = require("../../helpers");

async function refresh(req, res) {
  const { refreshToken: token } = req.body;
  try {
    const { id, email } = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
    const isExist = await userModel.findOne({ refreshToken: token });
    if (!isExist) {
      throw newError(403, "Token invalid");
    }

    const payload = {
      id,
      email,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw newError(403, error.message);
  }
}

module.exports = refresh;
