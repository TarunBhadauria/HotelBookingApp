const nodemailer = require("nodemailer");
require('dotenv').config();

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:  process.env.NODEMAILER_USERNAME,
        pass:  process.env.NODEMAILER_PASSWORD,
    }
});

module.exports = mailer;