const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const userModel = require("../../models/schemas/user");
const { newError } = require("../../helpers");

async function register(req, res) {
  const { name, dateOfBirth, email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

  let user = await userModel.findOne({ email });
  if (user !== null) {
    throw newError(409, "Email in use");
  }
  const passwordHash = await bcrypt.hash(password, 8);

  const today = new Date();
  const birth = new Date(dateOfBirth);
  const age =
    today.getFullYear() -
    birth.getFullYear() -
    (today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
      ? 1
      : 0);

  const isAdult = age >= 18;

  user = await userModel.create({
    name,
    dateOfBirth,
    email,
    password: passwordHash,
    avatarURL,
    adult: isAdult,
  });

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "2m" }
  );
  user.accessToken = accessToken;
  await user.save();

  const userResponse = { name, avatarURL };

  res.status(201).send({ user: userResponse, accessToken });
}

module.exports = register;
