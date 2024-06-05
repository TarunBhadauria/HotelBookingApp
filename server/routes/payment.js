const express = require('express');
const authN = require('../middlewares/authN');
const router = express.Router();

//  Importing Middlewares
const { isUser } = require('../middlewares/authZ');

//  Importing Controllers
const { capturePayment, verifyPayment } = require('../controller/Payment');

//  Assigning Route to Controllers 
router.post('/capturePayment', authN, isUser, capturePayment)
router.post('/verifyPayment', authN, isUser, verifyPayment);

//  Exporting router
module.exports = router;