const { failed, customError } = require("../utils/errorHandler")
const Hotel = require("../models/Hotel");
const Review = require("../models/Review");
const uploadToCloudinary = require("../utils/uploadHandler");
const Room = require("../models/Room");


exports.getAllHotels = async (req, res) => {
    try {
        // Fetch all the hotels from database
        const allHotels = await Hotel.find();

        // return response 
        return res.status(200).json({
            success: true,
            message: "Hotels fetched successfully",
            response: allHotels
        });


    } catch (err) {
        failed(res, err);
    }
}
exports.getFamousHotels = async (req, res) => {
    try {
        // Fetch all the hotels from database & Arrange them into descending order of rating
        const allHotels = await Hotel.find().sort({ review: { rating: -1 } }).populate("owner");
        // ------> Check the above approach once ....
        // return response
        return res.status(200).json({
            success: true,
            message: "Famous Hotels Fetched Successfully",
            response: allHotels
        });

    } catch (err) {
        failed(res, err);
    }
}
exports.getHotelDetails = async (req, res) => {
    try {
        //Fetching 
        const { hotelId } = req.body;

        // Validation
        if (!hotelId) {
            throw customError("Unable to find that hotel", 404);
        }

        // Fetch hotel details from database
        const hotelDetails = await Hotel.findById(hotelId)
            .populate("owner")
            .populate("rooms")
            .populate("review")
            .exec();

        // Return response
        res.status(200).json({
            success: true,
            message: "Hotel details fetched successfully",
            response: hotelDetails
        });
    } catch (err) {
        failed(res, err);
    }
}
exports.getFilteredHotels = async (req, res) => {
    try {

    } catch (err) {
        failed(res, err);
    }
}

exports.createHotel = async (req, res) => {
    try {

        // Fetching
        const userId = req.user.id;
        const { hotelImages } = req.files;

        const { name, address, city, state, pinCode, landmark, facilities } = req.body;

        // Validation
        if (hotelImages.length === 0) {
            throw customError("Atleast one hotel image is required", 404);
        }
        if (!name || !address || !city || !state || !pinCode || !landmark || !facilities) {
            throw customError("All fields are mandatory", 402);
        }

        // Perform Task
        // Insert Data into database
        const newHotel = new Hotel({
            name, owner: userId, address, city, state, pinCode, landmark, facilities
        });

        // Upload Image to cloudinary
        hotelImages.forEach(async (image) => {
            const upload = await uploadToCloudinary(image, 'hotelImage');
            newHotel.imageURL.push(upload.secure_url);
        });


        await newHotel.save();

        // return response 
        res.status(200).json({
            success: true,
            message: "Hotel created Successfully",
            response: newHotel
        })

    } catch (err) {
        failed(res, err);
    }
}
exports.updateHotel = async (req, res) => {
    try {
        //   Fetching
        const userId = req.user.id;
        const hotelImage = req.files.hotelImage;
        const { hotelId, name, address, city, imageUrl, pincode, landmark, facilities } = req.body;

        // Validation  
        if (!hotelId) {
            throw customError("Unknown Hotel Selection", 402);
        }
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            throw customError("Unable to find the hotel", 404);
        }
        if (userId !== hotel.owner) {
            throw customError("This Hotel Doesn't belongs to you.",)
        }

        //  Perform Task
        //  If image sent, delete that image
        if(imageUrl){
            await   Hotel.findByIdAndUpdate(hotelId, {
                $pull: {
                    imageURL: imageUrl,
                }
            })
        }
        //  If file sent
        if(hotelImage.length !== 0 ){
            const upload = await uploadToCloudinary(hotelImage);
            await   Hotel.findByIdAndUpdate(hotelId, {
                $push: {
                    imageURL: upload.secure_url,
                }
            })
        }

        //   Updating data in database
        const updatedHotel = await Hotel.findByIdAndUpdate({ _id: hotelId }, {
            name: name ? name : hotel.name,
            address: address ? address : hotel.address,
            city: city ? city : hotel.city,
            pincode: pincode ? pincode : hotel.pincode,
            landmark: landmark ? landmark : hotel.pinCode,
            facilities: facilities ? facilities : hotel.facilities
        }, { new: true });

        //  return response
        return res.status(200).json({
            success: true,
            message: "Hotel details updated successfully",
        });
    } catch (err) {
        failed(res, err);
    }
}
exports.deleteHotel = async (req, res) => {
    try {
        //  Fetching
        const userId = req.user.id;
        const { hotelId } = req.body;

        // Validation
        if (!hotelId) {
            throw error("Unknown Hotel Selection", 402)
        }
        const hotel = await Hotel.findById({ _id: hotelId });
        if (!hotel) {
            throw error("Unable to find the hotel", 404);
        }
        if (userId !== hotel.owner) {
            throw customError("This Hotel Doesn't belongs to you.", 401);
        }

        //  Perform Task
        //  Delete entry from database
        hotel.rooms.forEach(async(room)=>{
            await   Room.findByIdAndDelete(room);
        })
        hotel.reviews.forEach(async(review)=>{
            await   Review.findByIdAndDelete(review);
        })
        await Hotel.findByIdAndDelete({ _id: hotelId });

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Hotel removed successfully",
        });
    } catch (err) {
        failed(res, err);
    }
}
exports.reportHotel = async (req, res) => {
    try {

    } catch (err) {
        failed(res, err);
    }
}