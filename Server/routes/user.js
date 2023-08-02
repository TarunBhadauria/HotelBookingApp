const express = require('express');
const router = express.Router();

//  Importing Middlewares
const authN = require('../middlewares/authN');

//  Importing Controllers
const { signup, login, changePassword, deleteUser } = require('../controller/User');

//  Assigning Routes to controllers and middlewares
router.post('/signupUser', signup)
router.get('/loginUser', login)
router.put('/changePassword', authN, changePassword)
router.delete('/deleteUser', authN, deleteUser)

//  Exporting router
module.exports = router;