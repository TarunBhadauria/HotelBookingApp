const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailHandler");
const { resetPasswordMail } = require("../mails/ResetPasswordMail");


const ResetPasswordTokenSchema = new  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: '1d',
    },
    token: {
        type: String,
        required: true,
    }
})

ResetPasswordTokenSchema.post("save", async(data)=>{
    mailSender(data.email, 'Reset Password Token', resetPasswordMail(`${data.firstName} ${data.lastName}`, data.token));
})

module.exports = mongoose.model('ResetPasswordToken', ResetPasswordTokenSchema);