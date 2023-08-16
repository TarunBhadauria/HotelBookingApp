const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    rating: {
        type: Number,
        minLength: 1,
        maxLength: 5,
        required:true
    },
    title: {
        type: String,
    },
    review:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    helpful: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("Review", reviewSchema);