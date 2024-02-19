const userModel = require("../../models/schemas/user");
const { newError, sendMail } = require("../../helpers");

async function sendSubscribe(req, res) {
  const { email, name, id, subscribed } = req.user;

  if (email !== req.body.email) {
    throw newError(403, "Enter own email");
  }

  if (subscribed) {
    throw newError(403, "You already subscribed");
  }

  const subscribedEmail = {
    to: email,
    subject: "Thank you for your subscription",
    html: `Dear ${name}, you have successfully subscribed for updates from Drink Master!`,
  };

  await sendMail(subscribedEmail);
  await userModel.findByIdAndUpdate(id, { subscribed: true });

  res.json({
    email: email,
    subscribed: true,
  });
}

module.exports = sendSubscribe;
