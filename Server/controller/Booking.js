const { response } = require("express");
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const { failed, customError } = require("../utils/errorHandler");

exports.createBooking = async (req, res) => {
  // Approach is to check avilability by room count
  // roomcount===0 ? unable to book : book the hotel
  try {
    // Fetching
    const userId = req.user.id;
    const {
      totalPrice,
      totalPerson,
      hotel,
      room,
      requestedInDate,
      requestedOutDate
    } = req.body;
    console.log(totalPrice, totalPerson, hotel, room);
    // Validation
    if (
      !totalPrice ||
      !hotel ||
      !requestedInDate ||
      !requestedOutDate ||
      !totalPerson ||
      !room
    ) {
      throw customError("All fields are mandatory", 402);
    }
    // Availibility Check

    /*Logic
            For Example you wan to book from 4 to 7 dates
            
            Case 1: That room already book 2 to 5 => BookingIn <= RequestedIn <= BookingOut
            Case 2: That room already book 6 to 9 => BookingIn <= RequestedOut <= bookingOut
            Case 3  That room already book 3 to 8 => BookingIn <= RequestedIn && RequestedOut <= BookingOut
            Case 4  That room already book 5 to 6 => RequestedIn <= BookingIn && BookingOut <= RequestedOut

            These are the all intersections segments.
            Now We already have numbers of rooms in that hotel, 
            So we just need to check if numberOfTotalRooms <= TotalBooking (No Rooms left)

            Why this is better,
            We can later implement the suggestion if all this types of room is occupied, 
            we can let him know the nearest free date.
        */

    const totalBooking = await Booking.find({
      $and: [
        { hotel: hotel },
        { room: room },
        {
          $or: [
            {
              checkInDate: { $lt: requestedInDate },
              checkOutDate: { $gt: requestedInDate },
            },
            {
              checkInDate: { $lt: requestedOutDate },
              checkOutDate: { $gt: requestedOutDate },
            },
            {
              checkInDate: { $lte: requestedInDate },
              checkOutDate: { $gte: requestedOutDate }, 
            },
            {
              checkInDate: { $gte: requestedInDate },
              checkOutDate: { $lte: requestedOutDate },
            },
          ],
        },
      ],
    });

    const totalRooms = (await Room.findById(room)).numberOfRooms;

    if (totalBooking.length >= totalRooms) {
      throw customError("Rooms are not available");
    }

    // Perform Task
    const newBooking = new Booking({
      user:userId,
      totalPrice,
      totalPerson,
      hotel,
      room,
      checkInDate:requestedInDate,
      checkOutDate:requestedOutDate,
    });

    await newBooking.save();

    // Send Response
    return res.status(200).json({
      success: true,
      message: "Booking created successfully",
      response: newBooking,
    });
  } catch (err) {
    console.log(err)
    failed(res, err);
  }
};

exports.getAllBookings = async (req, res) => {
  // Fetching
  const userId = req.user.id;

  //  Perform Task
  const allBookings = await Booking.find({ user: userId });

  //  Send Response
  return res.status(200).json({
    success: true,
    message: "Bookings fetched successfully",
    bookings: allBookings,
  });
};

exports.getBooking = async (req, res) => {
  // Fetching
  const { bookingId } = req.body;
  const userId = req.user.id;

  // Validation
  if (!bookingId) {
    throw customError("Booking not found", 404);
  }
  const booking = await Booking.findById(bookingId)
    .populate("Hotel")
    .populate("Room");
  if (!booking) {
    throw customError("Invalid Booking", 404);
  }
  if (booking.user !== userId) {
    throw customError("This Booking doesn't belongs to you");
  }

  //return response
  res.status(200).json({
    success: true,
    message: "Booking fetched successfully",
    bookingData: booking,
  });
};

exports.updateBooking = async (req, res) => {
  try {
    // Fetching
    const { bookingId, totalPerson, room, checkInDate, checkOutDate } =
      req.body;
    const userId = req.user.id;

    // Validation
    if (!bookingId) {
      throw customError("No Booking is selected");
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw customError("No Booking Found");
    }
    if (booking.user.toString() !== userId) {
      throw customError("This Booking Doesn't belongs to you.");
    }
    //
    if (booking.checkOutDate < Date.now()) {
      throw customError("Cannot make changes in old booking");
    }
    if (!totalPerson && !room && !checkInDate && !checkOutDate) {
      throw customError("Atleast One Changes is required", 404);
    }
    if (checkInDate && booking.checkInDate < Date.now()) {
      throw customError("Cannot Change CheckIn Date after it passed.");
    }

    // Perform Task -   Updated Booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id:bookingId },
      {
        totalPerson: totalPerson ? totalPerson : booking.totalPerson,
        room: room ? room : booking.room,
        checkInDate: checkInDate ? checkInDate : booking.checkInDate,
        checkOutDate: checkOutDate ? checkOutDate : booking.checkOutDate,
      }
    );

    // return response
    res.status(200).json({
      success: true,
      message: "Booking Updated Successfully",
      response:updatedBooking
    });
  } catch (err) {
    console.log(err)
    failed(res, err);
  }
};
exports.extendBooking = async (req, res) => {
  try {
    // Fetch
    const { bookingId, checkOutDate } = req.body;
    const userId = req.user.id;

    // Validation
    if (!bookingId) {
      throw customError("No Booking selected");
    }
    const bookingData = await Booking.findById(bookingId);
    if (!bookingData) {
      throw customError("Unable to find your booking", 404);
    }
    if (bookingData.user.toString() !== userId) {
      throw customError("This Booking doesn't belongs to you.");
    }
    if (!checkOutDate) {
      throw customError("All fields are mandatory", 404);
    }
    if (checkOutDate <= bookingData.checkOutDate) {
      throw customError("Please extend the number of days", 408);
    }

    // Perform Task -   Extend Booking
    await Booking.findByIdAndUpdate(bookingId, { checkOutDate });

    // return response
    res.status(200).json({
      success: true,
      message: "Booking extended successfully",
    });
  } catch (err) {
    failed(res, err);
  }
};
exports.cancelBooking = async (req, res) => {
  try {
    // Fetch
    const { bookingId } = req.body;
    const userId = req.user.id;

    // Validation
    if (!bookingId) {
      throw customError("No Booking is selected", 404);
    }
    const booking = await Booking.findById({ _id: bookingId });
    if (!booking) {
      throw customError("Booking Not Found", 404);
    }
    if (booking.user.toString() !== userId) {
      throw customError("This booking doesn't belongs to you");
    }
    if (booking.checkInDate <= Date.now()) {
      throw customError("Unable to cancel current booking");
    }

    // Perform Task -   Cancel the Booking
    await Booking.findByIdAndDelete(bookingId);

    // Send Response
    res.status(200).json({
      success: true,
      message: "Booking cancelled Successfully",
    });
  } catch (err) {
    console.log(err)
    failed(res, err);
  }
};
