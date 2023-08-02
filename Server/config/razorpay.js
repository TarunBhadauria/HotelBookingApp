const Razorpay = require('razorpay');

const razorpayConnect = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

module.exports = razorpayConnect;