const express = require('express');
const router = express.Router();

//  Importing Middlewares
const authN = require('../middlewares/authN');
const { isUser } = require('../middlewares/authZ');

//  Importing Controllers
const { createRating, updateRating, deleteRating, getAllRating, viewProfile } = require('../controller/Review');

//  Assigning Routes to controllers and middlewares
router.post('/createRating', authN, isUser, createRating);
router.put('/updateRating', authN, isUser, updateRating);
router.delete('/deleteRating', authN, isUser, deleteRating);
router.get('/getAllRating', getAllRating);
router.get('/viewProfile', getProfile);

//  Exporting router
module.exports = router;