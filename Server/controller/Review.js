const Review = require("../models/Review");
const { failed, customError } = require("../utils/errorHandler");


exports.createReview = async (req, res) => {
    try {
        // Fetching
        const userId = req.user.id;
        const { hotelId, title, review, rating } = req.body;
        // validation
        if (!userId) {
            throw customError("Invalid User Id", 404);
        }

        if (!hotelId) {
            throw customError("Invalid Hotel Id", 404);
        }

        if (!title || !review || rating) {
            throw customError("All fields are mandatory", 402);
        }
        // Check weather the hotel is already reviewed by user ?
        const oldReview = await Review.find({ user: userId, hotel: hotelId });
        // If reviewed throw error
        if (oldReview) {
            throw customError("This hotel is already reviewed by you");
        }
        // Else create new entry in db

        const newReview = new Review({ user: userId, hotel: hotelId, title, review, rating });

        await newReview.save();

        // return response 

        res.status(200).json({
            success: true,
            message: "Review Submitted Successfully",
            response: newReview
        });
    } catch (err) {
        failed(res, err);
    }
}

exports.updateReview = async (req, res) => {
    try {
        //  Fetching
        const userId = req.user.id;
        const { hotelId, reviewId, title, newReview, rating } = req.body;
        // Validation
        if (!userId) {
            throw customError("Invalid User Id");
        }
        if (!hotelId) {
            throw customError("Invalid Hotel Id");
        }

        // Check weather this review is submitted by this user ...
        const review = await Review.findById({ reviewId });

        if (userId !== review.user) {
            throw customError("This review wasn't submitted by you");
        }

        // Update the entry in database 
        const updatedReview = await Review.findByIdAndUpdate({ reviewId }, { title, review: newReview, rating });
        // return response 

        res.status(200).json({
            success: true,
            message: "Review Updated successfully",
            response: updatedReview
        })

    } catch (err) {
        failed(res, err);
    }
}
exports.deleteReview = async (req, res) => {
    try {
        // Fetching
        const userId = req.user.id;
        const { reviewId } = req.body;

        // Validation
        if (!userId) {
            throw customError("Invalid user Id");
        }
        if (!reviewId) {
            throw customError("Invalid review Id", 402);
        }
        // Check weather review exist in DB or not...
        const review = await Review.findById({ reviewId });

        if (!review) {
            throw customError("Review not found");
        }
        // Check weather review is submitted by this user or not...
        if (userId !== review.user) {
            throw customError("This review wasn't submitted by you");
        }

        // Remove the entry from the database

        const removedReview = await Review.findByIdAndDelete({ reviewId });

        // return response
        res.status(200).json({
            success: true,
            message: "Review removed successfully",
            response: removedReview
        });


    } catch (err) {
        failed(res, err);
    }
}
exports.getAllReviews = async (req, res) => {
    try {
        //    Fetching 
        const { hotelId } = req.body;
        // Validation
        if (!hotelId) {
            throw customError("Invalid Hotel id");
        }
        // Get reviews from database

        const allReviews = await Review.find()
            .populate("user")
            .exec();

        // Return response

        res.status(200).json({
            success: true,
            message: "Review's fetched successfully",
            response: allReviews
        })


    } catch (err) {
        failed(res, err);
    }
}
exports.getProfile = async (req, res) => {
    try {

    } catch (err) {
        failed(res, err);
    }
}