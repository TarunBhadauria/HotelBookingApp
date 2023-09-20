const express = require('express');
const router = express.Router();

//  Importing Middlewares
const authN = require('../middlewares/authN');
const { isOwner, isUser } = require('../middlewares/authZ');

//  Importing Controllers
const { createHotel, updateHotel, deleteHotel, reportHotel, getAllHotels, getFamousHotels, getFilteredHotels, getHotelDetails } = require('../controller/Hotel');
const { addRoom, updateRoom, removeRoom } = require('../controller/Room');
const { createBooking, updateBooking, extendBooking, cancelBooking } = require('../controller/Booking');

//  Assigning Routes to controllers and middlewares
router.get('/getAllHotels', getAllHotels);
router.get('/getFamousHotels', getFamousHotels);
router.get('/getHotelDetails', getHotelDetails);
router.get('/getFilteredHotels', getFilteredHotels);
router.post('/createHotel', authN, isOwner, createHotel);
router.put('/updateHotel', authN, isOwner, updateHotel);
router.delete('/deleteHotel', authN, isOwner, deleteHotel);
router.post('/addRoom', authN, isOwner, addRoom);
router.put('/updateRoom', authN, isOwner, updateRoom);
router.delete('/removeRoom', authN, isOwner, removeRoom);
router.post('/report', authN, reportHotel);

router.post('/createBooking', authN, isUser, createBooking)
router.put('/updateBooking', authN, isUser, updateBooking)
router.put('/extendBooking', authN, isUser, extendBooking)
router.delete('/cancelBooking', authN, isUser, cancelBooking)

//  Exporting router
module.exports = router;