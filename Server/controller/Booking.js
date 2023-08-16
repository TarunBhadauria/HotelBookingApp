const Booking = require("../Models/Booking");
const { failed } = require("../utils/errorHandler")


exports.createBooking = async (req, res) => {
    try {
        // fetch user ,totalPerson,hotel,checkInDate,checkOutDate,totalAmount from req.body

        const { user, totalPrice, totalPerson, hotel, checkInDate, checkOutDate, room } = req.body;

        // validate the data

        if (!user || !totalPrice || !hotel || !checkInDate || !checkOutDate || !totalPerson || !room) {
            return res.status(404).json({
                success: false,
                message: "All fields are mandatory"
            })
        }

        else {
            // else insert booking data into db 
            const newBooking = await Booking.create({ user, totalPrice, totalPerson, hotel, room, checkInDate, checkOutDate });

            //return response
            return res.status(200).json({
                success: true,
                message: "Booking created successfully",
                response: newBooking
            });
        }

    } catch (err) {
        failed(res, err);
    }
}

exports.getAllBookings = async (req, res) => {

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


}

exports.getBooking = async (req, res) => {
    //fetch booking id from req.body
    const { bookingId } = req.body;
    //validation
    if (!bookingId) {
        return res.status(404).json({
            success: false,
            message: "Invalid booking Id"
        });
    }
    // fetch booking details from db
    const bookingData = await Booking.findById(bookingId)
        .populate("User")
        .populate("Hotel")
        .populate("Room");
    //return response 
    return response.status(200).json({
        success: true,
        message: "Booking fetched successfully",
        response: bookingData
    });
}

exports.updateBooking = async (req, res) => {
    try {
        // fetch data from req.body
        const { bookingId, totalPerson, totalPrice, room, checkInDate, checkOutDate } = req.body;
        //validation
        if (!bookingId || !totalPerson || !totalPrice || !room || !checkInDate || !checkOutDate) {
            return res.status(404).json({
                success: false,
                message: "All fields are mandatory"
            })

        }
        else {
            // update the data in database
            const updatedBooking = await Booking.findByIdAndUpdate({bookingId}, { totalPerson, totalPrice, room, checkInDate, checkOutDate }, { new: true });
            // return response 
            return res.status(200).json({
                success: true,
                message: "Booking updated Successfully",
                response: updatedBooking
            })
        }

    } catch (err) {
        failed(res, err);
    }
}
exports.extendBooking = async (req, res) => {
    try {
        //  fetch checkIn and checkOut date from req.body
        const { bookingId, checkInDate, checkOutDate } = req.body;
        const bookingDetails = await Booking.findById({ _id: bookingId });
        // validation
        if (!bookingId || !checkInDate || !checkOutDate) {
            return res.status(404).json({
                success: false,
                message: "All fields are mandatory"
            });
        }
        else if (!checkOutDate > bookingDetails.checkOutDate) {
            return res.status(408).json({
                success: false,
                message: "please extend number of days"
            })
        }
        else {
            //else update the booking with given dates
            const extendedBooking = await Booking.findByIdAndUpdate(bookingId, { checkInDate, checkOutDate }, { new: true });
            // return response 
            return res.staus(200).json({
                success: true,
                message: "Booking extended successfully",
                response: extendedBooking
            })
        }
    } catch (err) {
        failed(res, err);
    }
}
exports.cancelBooking = async (req, res) => {
    try {
        // fetch the booking id from req body 
        const { bookingId } = req.body;
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
        }
        //else find thebooking id and remove from database
        else {
            const cancelledBooking = await Booking.findByIdAndDelete({ _id: bookingId });
            //return response
            return res.status(200).json({
                success: true,
                message: "Booking cancelled Successfully",
                response: cancelledBooking
            })
        }
    } catch (err) {
        failed(res, err);
    }
}
