const jwt = require("jsonwebtoken");
const userModel = require("../models/schemas/user");
const { newError } = require("../helpers");

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "undefined") {
    return next(newError(401));
  }

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return next(newError(401));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return next(newError(401));
    }

    const user = await userModel.findById(decode.id);
    if (user === null) {
      return next(newError(401));
    }
    if (user.token !== token) {
      return next(newError(401));
    }

    req.user = {
      id: decode.id,
      email: user.email,
    };

    next();
  });
}

module.exports = validateToken;
