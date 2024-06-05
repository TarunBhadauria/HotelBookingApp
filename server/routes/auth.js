const express = require('express');
const router = express.Router();

//  Importing Middlewares
const authN = require('../middlewares/authN');

//  Importing Controllers
const { verifyEmail, sendOTP, resetPassword, resetPasswordToken } = require('../controller/Auth');

//  Assigning Routes to controllers and middlewares
router.post('/verifyEmail', authN, verifyEmail);
router.post('/sendOTP', authN, sendOTP); 
router.post('/resetPassword', resetPassword);
router.post('/resetPasswordToken', resetPasswordToken);  

//  Exporting router
module.exports = router;