const Hotel = require("../models/Hotel");
const Review = require("../models/Review");
const User = require("../models/User");
const { failed, customError } = require("../utils/errorHandler");

exports.createRating = async (req, res) => {
  try {
    // Fetching
    const userId = req.user.id;
    const { hotelId, title, review, rating } = req.body;

    // Validation
    if (!hotelId) {
      throw customError("Unknown hotel selection", 404);
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw customError("Unable to find the hotel", 404);
    }
    if (!title || !review || !rating) {
      throw customError("All fields are mandatory", 402);
    }

    // Check weather the hotel is already reviewed by user ?
    const oldReview = await Review.find({ user: userId, hotel: hotelId });
    // If reviewed throw error
    if (oldReview.length !== 0) {
      throw customError("This hotel is already reviewed by you");
    }
    // Else create new entry in db

    const newReview = new Review({
      user: userId,
      hotel: hotelId,
      title,
      review,
      rating,
    });
    const reviewedHotel = await Hotel.findById(hotelId)
      .populate("owner")
      .populate("rooms")
      .populate("review")
      .exec();

    await Hotel.findByIdAndUpdate(hotelId,{
      $push:{
        reviews:newReview._id
      }
    })  
    console.log(reviewedHotel);  

    await newReview.save();

    // return response

    res.status(200).json({
      success: true,
      message: "Review Submitted Successfully",
      response: newReview,
    });
  } catch (err) {
    failed(res, err);
  }
};

exports.updateRating = async (req, res) => {
  try {
    //  Fetching
    const userId = req.user.id;
    const { hotelId, reviewId, newTitle, newReview, newRating } = req.body;
    // Validation
    if (!newTitle && !newReview && !newRating) {
      throw customError("What are you updating man ?", 404);
    }
    if (!hotelId) {
      throw customError("Invalid Hotel Id");
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw customError("Unable to find the hotel", 404);
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      throw customError("Unable to find the review");
    }
    if (userId !== review.user.toString()) {
      throw customError("This review wasn't submitted by you", 403);
    }

    // Update the entry in database
    const updatedReview = await Review.findByIdAndUpdate(reviewId, {
      title: newTitle ? newTitle : review.title,
      review: newReview ? newReview : review.review,
      rating: newRating ? newRating : review.rating,
    });

    // return response
    res.status(200).json({
      success: true,
      message: "Review Updated successfully",
      response: updatedReview,
    });
  } catch (err) {
    failed(res, err);
  }
};
exports.deleteRating = async (req, res) => {
  try {
    // Fetching
    const userId = req.user.id;
    const { reviewId } = req.body;
    
    // Validation
    if (!reviewId) {
      throw customError("Unknown Review Selection", 402);
    }
    // Check weather review exist in DB or not...
    let review = await Review.findById(reviewId);
    if (!review) {
      throw customError("Unable to find Review");
    }
    // Check weather review is submitted by this user or not...
    if (userId !== review.user.toString()) {
      throw customError("This review wasn't submitted by you");
    }

    // Remove the entry from the database00
    const removedReview = await Review.findByIdAndDelete(reviewId);

    // return response
    res.status(200).json({
      success: true,
      message: "Review removed successfully",
      response: removedReview,
    });
  } catch (err) {
    failed(res, err);
  }
};
exports.getAllRating = async (req, res) => {
  try {
    //    Fetching
    const { hotelId } = req.body;

    // Validation
    if (!hotelId) {
      throw customError("Unknown hotel selection");
    }
    const hotel = await Hotel.findById(hotelId);
    if (hotel) {
      throw customError("Unabe to find the hotel", 404);
    }

    // Get reviews from database
    const allReviews = await Review.find({ hotel: hotelId })
      .populate("user")
      .exec();

    // Return response
    res.status(200).json({
      success: true,
      message: "Review's fetched successfully",
      allReviews,
    });
  } catch (err) {
    failed(res, err);
  }
};
exports.getProfile = async (req, res) => {
  try {
    // Fetching
    const { userId } = req.body;

    // Validation
    if (!userId) {
      throw customError("Unknown user selection", 404);
    }
    const user = await User.findById(userId);
    if (!user) {
      throw customError("Unable to find th user", 404);
    }

    // Perform Task
    const allReviews = await Review.find({ user: userId }).populate("user");

    // Send Response
    res.status(200).json({
      success: true,
      message: "Successfully fetched all the reviews",
      allReviews,
    });
  } catch (err) {
    failed(res, err);
  }
};
