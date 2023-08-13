const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: '15m',
    },
    otp:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('OTP', otpSchema);