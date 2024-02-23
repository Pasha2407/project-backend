const express = require("express");
const router = express.Router();

const {
  validateToken,
  validateSchema,
  passport,
} = require("../../middlewares");
const { registerJoiSchema } = require("../../models/joiSchemas/auth");
const {
  loginJoiSchema,
  refreshSchema,
} = require("../../models/joiSchemas/auth");

const { wrapper } = require("../../helpers");
const method = require("../../controllers/auth");
const { googleAuth } = require("../../controllers/auth");

router.post(
  "/signup",
  validateSchema(registerJoiSchema),
  wrapper(method.register)
);

router.post("/signin", validateSchema(loginJoiSchema), wrapper(method.login));

router.post("/refresh", validateSchema(refreshSchema), wrapper(method.refresh));

router.post("/signout", validateToken, wrapper(method.logout));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

module.exports = router;
