const validateSchema = require("./validateSchema");
const validateToken = require("./validateToken");
const upload = require("./upload");
const passport = require("./google-authenticate");

module.exports = {
  validateSchema,
  validateToken,
  upload,
  passport,
};
