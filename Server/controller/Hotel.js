const { failed, customError } = require("../utils/errorHandler")
const Hotel = require("../models/Hotel");
const Review = require("../models/Review");


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
        if(!hotelId){
            throw error("Missing HotelId",404);
        }

        // Fetch hotel details from database
        const hotelDetails = await Hotel.findById({_id:hotelId})
                             .populate("owner")
                             .populate("rooms")
                             .populate("review")
                             .exec();
        // Return response
           return res.status(200).json({
            success:true,
            message:"Hotel details fetched successfully",
            response:hotelDetails
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

        const {name,address,city,imageURL,state,pinCode,landmark,facilities} = req.body;
        // Validation
        if(!name||!address||!city||!imageURL||!state||!pinCode||!landmark||!facilities){
            throw error("All fields are mandatory",402);
        }

        // Insert Data into database
        const newHotel = new Hotel ({
            name,userId,address,city,imageURL,state,pinCode,landmark,facilities
        });

        await newHotel.save();

        // return response 

        return res.status(200).json({
            success:true,
            message:"Hotel created Successfully",
            response:newHotel
        })

    } catch (err) {
        failed(res, err);
    }
}
exports.updateHotel = async (req, res) => {
    try {
        //   Fetching
        const userId = req.user.id;
          const {hotelId,name,address,city,imageUrl,pincode,landmark,facilities} = req.body;
        // Validation  
          if(!hotelId){
            throw customError("Invalid Hotel Id",402);
          }

          const hotel = await Hotel.findById({_id:hotelId});
          if(userId!==hotel.owner){
            throw customError("This Hotel Doesn't belongs to you.",)
          }
          if(!hotel){
            throw customError("Hotel Not Found",404);
          }
        //   Updating data in database
          const updatedHotel =await Hotel.findByIdAndUpdate({_id:hotelId},{
            name:name?name:hotel.name,
            address:address?address:hotel.address,
            city:city?city:hotel.city,
            imageUrl:imageUrl?imageUrl:hotel.imageURL,
            pincode:pincode?pincode:hotel.pincode,
            landmark:landmark?landmark:hotel.pinCode,
            facilities:facilities?facilities:hotel.facilities
          },{new:true});

        //  return response
        
          return res.status(200).json({
            success:true,
            message:"Hotel details updated successfully",
            response:updatedHotel
          });


    } catch (err) {
        failed(res, err);
    }
}
exports.deleteHotel = async (req, res) => {
    try {
        // fetch hotelId from req.body
        const{hotelId} = req.body;
        // Validation
        if(!hotelId){
            throw error("Invalid HotelId",402)
        }
        const hotel = await Hotel.findById({_id:hotelId});
        if(!hotel){
            throw error("No hotel found with this Id",404);
        }
        if(userId!==hotel.owner){
            throw customError("This Hotel Doesn't belongs to you.",)
          }
        // Delete entry from database
        const removedHotel = await Hotel.findByIdAndDelete({_id:hotelId});
        // return response
        return res.status(200).json({
            success:true,
            message:"Hotel removed successfully",
            response:removedHotel
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