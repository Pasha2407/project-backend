const express = require("express");
const router = express.Router();

const { validateToken, validateSchema } = require("../../middlewares");
const { registerJoiSchema } = require("../../models/joiSchemas/auth");
const { loginJoiSchema } = require("../../models/joiSchemas/auth");

const { wrapper } = require("../../helpers");
const method = require("../../controllers/auth");

router.post(
  "/signup",
  validateSchema(registerJoiSchema),
  wrapper(method.register)
);

router.post("/signin", validateSchema(loginJoiSchema), wrapper(method.login));

router.post("/signout", validateToken, wrapper(method.logout));

module.exports = router;
