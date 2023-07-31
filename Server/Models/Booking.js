const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    totalPersona:{
        type:Number,
        required:true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    checkInDate: {
        type: Date, 
        required: true,
    },
    checkOutDate: {
        type: Date,
        require: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Booking",bookingSchema);