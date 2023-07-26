const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    roomType:{
        type:String,
        enum:["Single Bed", "Double Bed"],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isBooked:{
        type:Boolean
    }
});

module.exports = mongoose.Model("Room",roomSchema);