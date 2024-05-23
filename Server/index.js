const express = require('express');
const app = express();

//  Connection with Databse
const connectDB = require('./config/database');
connectDB();
const connectCloud = require('./config/cloudinary')
connectCloud();
// Import Cors
const cors = require('cors')
//  Importing Middlewares
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotEnv = require('dotenv');
dotEnv.config();
//  Using Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: {
        fileSize: 10*1024*1024,
    }
}));
app.use(
    cors({
        origin: process.env.CORS_URL,
        credentials: true,
    })
)

//  Importing routes
const authRoute = require('./routes/auth')
const hotelRoute = require('./routes/hotel')
const paymentRoute = require('./routes/payment')
const profileRoute = require('./routes/profile')
const reviewRoute = require('./routes/review')
const userRoute = require('./routes/user')

//  Assigning Routes
app.use('/api/v1/authenticate', authRoute)
app.use('/api/v1/hotel', hotelRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/profile', profileRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/user', userRoute)

//  Health Check
app.get('/', (req, res)=>{
    res.status(200).json({
        success: true, 
        message: "Server Started Successfully",
    })
})

//  Start Listening
app.listen(4000, ()=>{
    console.log('Server Started at port 4000: http://localhost:4000');
})
