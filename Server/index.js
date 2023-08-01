const express = require('express');
const app = express();

//  Connection with Databse
const connectDB = require('./config/database');
connectDB();
// Import Cors
const cors = require('cors')
//  Importing Middlewares
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotEnv = require('dotenv');

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
dotEnv.config();

//  Importing routes

//  Assigning Routes

//  Health Check
app.get('/', (req, res)=>{
    res.status(200).json({
        success: true, 
        message: "Server Started Successfully",
    })
})

//  Start Listening
app.listen(4000, ()=>{
    console.log('Server Started at port 4000');
})
