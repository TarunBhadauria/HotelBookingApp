const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailHandler');
const { verificationMail } = require('../mails/VerificationMail');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: '15m',
    },
    otp:{
        type:Number,
        required:true,
        maxLength: 6,
    }
})

otpSchema.post('save', async(data)=>{
    mailSender(data.email, 'Verification Email', verificationMail(`${data.firstName} ${data.lastName}`, this.otp));
})

module.exports = mongoose.model('OTP', otpSchema);