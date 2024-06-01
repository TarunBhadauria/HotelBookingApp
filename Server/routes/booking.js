const express = require('express');
const router = express.Router();

//  Importing Middlewares
const authN = require('../middlewares/authN');
const { createBooking, updateBooking, extendBooking, cancelBooking } = require('../controller/Booking');

router.post('/createBooking',authN,createBooking);
router.put('/updateBooking',authN,updateBooking);
router.put('/extendBooking',authN,extendBooking);
router.delete('/cancelBooking',authN,cancelBooking);

//  Exporting router
module.exports = router;