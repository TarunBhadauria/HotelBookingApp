const express = require('express');
const router = express.Router();

//  Importing Middlewares

//  Importing Controllers

//  Assigning Routes to controllers and middlewares
router.get('/getAllHotels', );
router.get('/getFamousHotels', );
router.get('/getSingleHotelDetails', );
router.get('/getFilteredRooms', );
router.post('/createHotel', );
router.put('/updateHotel', );
router.post('/addRooms', );
router.put('/updateRooms', );
router.delete('/deleteHotel', );
router.delete('/removeRooms', );
router.post('/report', );

//  Exporting router
module.exports = router;