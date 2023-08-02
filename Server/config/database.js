const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const url = process.env.DATABASE_URL;

const connectDB = async () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to Database successfully");
    }).catch((error) => {
        console.log("Connect failed ");
        console.log("Error", error.message);
        process.exit(1);
    })
}


module.exports = connectDB;