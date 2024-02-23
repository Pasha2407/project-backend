const jwt = require("jsonwebtoken");
const userModel = require("../models/schemas/user");
const { newError } = require("../helpers");

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "undefined") {
    return next(newError(401, "Not authorized"));
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return next(newError(401, "Not authorized"));
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, async (err, decode) => {
    if (err) {
      return next(newError(401, "Not authorized"));
    }

    const user = await userModel.findById(decode.id);
    if (!user) {
      return next(newError(401, "Not authorized"));
    }
    if (user.accessToken !== token) {
      return next(newError(401, "Not authorized"));
    }

    req.user = {
      id: decode.id,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      avatarURL: user.avatarURL,
      adult: user.adult,
      subscribed: user.subscribed,
      notificationShow: user.notificationShow,
      signinCount: user.signinCount,
    };

    next();
  });
}

module.exports = validateToken;
