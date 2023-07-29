const mongoose = require('mongoose')

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:String,
        required:true
    },
    
    review:{
        type:String,
        required:true
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    }    
});

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);