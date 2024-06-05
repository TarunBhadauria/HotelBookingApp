const Razorpay = require('razorpay');
require('dotenv').config();

const razorpayConnect = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

module.exports = razorpayConnect;