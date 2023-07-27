const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const DB_URL = process.env.DATABASE_URL

exports.connect = async () => {
   await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to db successfully");
    }).catch((error) => {
        console.log("Connect failed ");
        console.log("Error", error);
    })
}


