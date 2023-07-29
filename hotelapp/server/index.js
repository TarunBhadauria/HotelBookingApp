const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const database = require('./config/database')
dotenv.config()
const app = express();


app.listen(4000,()=>{
    console.log("server is running on 4000");
});

database.connect();