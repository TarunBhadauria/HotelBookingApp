const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomTitle:{
        type:String,
        required:true
    },
    roomType:{
        type:String,
        enum:["Single Bed", "Double Bed"],
        required:true
    },
    numberOfBed: {
        type: Number,
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    numberOfRooms: {
        type: Number,
        required: true,
    },
    images: [{
        type: String,
    }]
});

module.exports = mongoose.model("Room", roomSchema);