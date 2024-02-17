const express = require("express");
const router = express.Router();

const { validateSchema, upload } = require("../../middlewares");
const { updateUserJoiSchema, emailSchema }
  = require("../../models/joiSchemas/user");

const { wrapper } = require("../../helpers");
const method = require("../../controllers/users");

router.get("/current", wrapper(method.current));

router.patch(
  "/update",
  validateSchema(updateUserJoiSchema),
  upload.single("avatar"),
  wrapper(method.updateUser)
);

router.post(
  "/subscribe",
  validateSchema(emailSchema),
  wrapper(method.sendSubscribe)
);

module.exports = router;
