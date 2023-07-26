const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phone:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    otp:{
        type:Number,
        // check weather to add any expiry check here or not
    }
})