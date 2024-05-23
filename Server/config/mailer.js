const nodemailer = require("nodemailer");
require("dotenv").config();

let mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

console.log(
  "Here : ",
  process.env.NODEMAILER_USERNAME,
  process.env.NODEMAILER_PASSWORD
);

module.exports = mailer;
