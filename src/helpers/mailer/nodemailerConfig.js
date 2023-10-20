const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GLOBAL_MAIL,
    pass: process.env.PASSWORD_FOR_GLOBAL_MAIL,
  },
});

module.exports = transporter;
