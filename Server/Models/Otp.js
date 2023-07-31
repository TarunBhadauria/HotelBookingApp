const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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