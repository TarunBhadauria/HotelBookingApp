const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    ratingAndReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    state: {
        type: String,
        required: true
    }
})


module.exports = mongoose.Model("Hotel",hotelSchema);