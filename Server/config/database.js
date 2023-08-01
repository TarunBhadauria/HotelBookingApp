const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const url = process.env.DB_URL

const connectDB = async () => {
   await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to db successfully");
    }).catch((error) => {
        console.log("Connect failed ");
        console.log("Error", error);
    })


}


module.exports = connectDB;