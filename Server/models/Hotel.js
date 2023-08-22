const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }],
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    imageURL: [{
        type: String,
    }],
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true,
    },
    landmark: {
        type: String,
    },
    facilities: [{
        type: String,
    }]
})

module.exports = mongoose.Model("Hotel", hotelSchema);