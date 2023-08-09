const express = require('express');
const router = express.Router();

//  Importing Middlewares
const authN = require('../middlewares/authN');
const { isUser } = require('../middlewares/authZ');

//  Importing Controllers
const { updateUserDetails, getUserProfile, getBookedHotels, updateProfilePicture, getNotifications } = require('../controller/Profile');

//  Assigning Routes to controllers and middlewares
router.put('/updateUserDetails', authN, updateUserDetails);
router.get('/getUserProfile', authN, getUserProfile);
router.get('/getBookedHotels', authN, isUser, getBookedHotels);
router.put('/updateProfilePicture', authN, updateProfilePicture);
router.get('/notifications', authN, getNotifications);

//  Exporting router
module.exports = router;