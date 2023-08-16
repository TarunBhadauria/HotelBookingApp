const Booking = require("../models/Booking");
const { failed, customError } = require("../utils/errorHandler")


exports.createBooking = async (req, res) => {
    try {
        // Fetching
        const { user, totalPrice, totalPerson, hotel, checkInDate, checkOutDate, room } = req.body;

        // Validation
        if (!user || !totalPrice || !hotel || !checkInDate || !checkOutDate || !totalPerson || !room) {
            throw customError("All fields are mandatory", 404);
        }
        // To Do (I'll do that tomorrow)
        // const avaibleCheck = await  Booking.find({})

        // Perform Task
        const newBooking = new  Booking({
            user, totalPrice, totalPerson, hotel, room, checkInDate, checkOutDate
        })

<<<<<<< HEAD
        await   newBooking.save();

        // Send Response
        return res.status(200).json({
            success: true,
            message: "Booking created successfully",
            response: newBooking

        });
=======
            //return response
            return res.status(200).json({
                success: true,
                message: "Booking created successfully",
                response: newBooking
            });
        }
>>>>>>> 6419d9f787cc05d814ad43fe6484c4d1916051e3

    } catch (err) {
        failed(res, err);
    }
}

exports.getAllBookings = async (req, res) => {

<<<<<<< HEAD
    //fetch userId from req.body  ------> (do we have to get all userdetails or Id is enough ? User ID is enough)
    // Acutally We don't need to fetch anything, It's already taken case in middleware.
    const userId = req.user.id;

    //validate => No Validation is requires, (It's already taken care in middleware)
    // if (!userId) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Invalid User Id"
    //     });
    // }
    const allBookings = await Booking.find({ user: userId });

    //  Not required, we will take care of this thing in the frontend, if booking.length===0 show no booking found in UI.
    // //D is it nesessary
    // if (!allBookings) {
    //     //if no bookings found return message
    //     throw customError("No Boooking Found")
    //     return res.status(404).json({
    //         success: false,
    //         message: "No Bookings found"
    //     });
    // }
        //if found return response 
=======
    //fetch userId from req.body  ------> (do we have to get all userdetails or userId is enough ?)
    const { userId } = req.body;
    //validate
    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "Invalid User Id"
        });
    }
    else {
        const allBookings = await Booking.find({ user: userId });
        //D is it nesessary
        // allBookings.length > 0 ?
        if (!allBookings) {
            //if no bookings found return message
            return res.status(404).json({
                success: false,
                message: "No Bookings found"
            });
        }
        else {
            //if found return response 
            return res.status(200).json({
                success: true,
                message: "Bookings fetched successfully",
                response: allBookings
            })
        }
    }
>>>>>>> 6419d9f787cc05d814ad43fe6484c4d1916051e3


    return res.status(200).json({
        success: true,
        message: "Bookings fetched successfully",
        bookings: allBookings
    })
}

exports.getBooking = async (req, res) => {
    // Fetching
    const { bookingId } = req.body;
    const userId = req.user.id;

    // Validation
    if (!bookingId) {
        throw customError('Booking not found', 404);
    }
    const booking = await   Booking.findById(bookingId).populate('Hotel').populate('Room');
    if(!booking){
        throw customError('Invalid Booking', 404);
    }
    if(booking.user !== userId){
        throw customError("This Booking doesn't belongs to you");
    }

    //return response 
    res.status(200).json({
        success: true,
        message: "Booking fetched successfully",
        bookingData: booking
    });
}

exports.updateBooking = async (req, res) => {
    try {
        // Fetching
        const { bookingId, totalPerson, room, checkInDate, checkOutDate } = req.body;
        const userId = req.user.id;

        // Validation
        if(!bookingId){
            throw customError('No Booking is selected');
        }
        const booking = await   Booking.findById(bookingId);
        if(!booking){
            throw customError('No Booking Found');
        }
        if(booking.user !== userId){
            throw customError("This Booking Doesn't belongs to you.");
        }
        if(booking.checkOutDate > Date.now()){
            throw customError('Cannot make changes in old booking');
        }
        if (!totalPerson && !room && !checkInDate && !checkOutDate) {
            throw customError('Atleast One Changes is required', 404);
        }
        if(checkInDate && booking.checkInDate > Date.now()){
            throw customError('Cannot Change CheckIn Date after it passed.');
        }

        // Perform Task -   Updated Booking
        const updatedBooking = await Booking.findByIdAndUpdate({bookingId},{
            totalPerson: totalPerson ? totalPerson : booking.totalPerson,
            room: room ? room : booking.room,
            checkInDate: checkInDate ? checkInDate : booking.checkInDate,
            checkOutDate: checkOutDate ? checkOutDate : booking.checkOutDate,
        });

        // return response 
        res.status(200).json({
            success: true,
            message: "Booking Updated Successfully",
        })

    } catch (err) {
        failed(res, err);
    }
}
exports.extendBooking = async (req, res) => {
    try {
        // Fetch
        const { bookingId, checkOutDate } = req.body;
        const userId = req.user.id;

        // Validation
        if(!bookingId){
            throw customError('No Booking selected');
        }
        const bookingData = await Booking.findById(bookingId);
        if(!bookingData){
            throw customError('Unable to find your booking', 404);
        }
        if(bookingData.user !== userId){
            throw customError("This Booking doesn't belongs to you.");
        }
        if (!checkOutDate) {
            throw customError('All fields are mandatory', 404);
        }
        if (checkOutDate <= bookingData.checkOutDate) {
            throw customError("Please extend the number of days", 408);
        }

        // Perform Task -   Extend Booking
        await   Booking.findByIdAndUpdate(bookingId, { checkOutDate });

        // return response 
        res.staus(200).json({
            success: true,
            message: "Booking extended successfully",
        })
    } catch (err) {
        failed(res, err);
    }
}
exports.cancelBooking = async (req, res) => {
    try {
        // Fetch
        const { bookingId } = req.body;
<<<<<<< HEAD
        const userId = req.user.id;

        // Validation
        if(!bookingId){
            throw customError('No Booking is selected', 404);
        }
        const booking = await   Booking.findById({ _Id: bookingId });
        if (!booking) {
            throw customError('Booking Not Found', 404);
=======
        //validation 
        if(!bookingId){
            return res.status(404).json({
                success:false,
                message:"Invalid Booking Id"
            })
        }
        // check weather booking is present for given id 
        const booking = await Booking.findById({ _Id: bookingId });
        // if not then return response
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found for given Id"
            });
>>>>>>> 6419d9f787cc05d814ad43fe6484c4d1916051e3
        }
        if(booking.user !== userId){
            throw customError("This booking doesn't belongs to you");
        }
        if(booking.checkInDate >= Date.now()){
            throw customError('Unable to cancel current booking');
        }

        // Perform Task -   Cancel the Booking
        await   Booking.findByIdAndDelete(bookingId);

        // Send Response
        res.status(200).json({
            success: true,
            message: "Booking cancelled Successfully",
        })
    
    } catch (err) {
        failed(res, err);
    }
}
