const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "dozeran@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
  const email = { ...data, from: "dozeran@meta.ua" };
  await transport
    .sendMail(email)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
  return true;
};

module.exports = sendMail;
