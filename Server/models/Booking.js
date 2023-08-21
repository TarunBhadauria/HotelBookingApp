const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailHandler');
const User = require('./User');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    totalPerson:{
        type:Number,
        required:true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    checkInDate: {
        type: Date, 
        required: true,
    },
    checkOutDate: {
        type: Date,
        require: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const sendConfirmationEmail = async(email, hotel, room, person, checkIn, checkOut, price)=>{
    try{
        const mailResponse = await  mailSender(
            email, 
            'Hotel Booked Successfully',
            "Successfully Booked Hotel");
    }catch(err){
        console.log('Error while sending email: ', err.message);
    }
}

bookingSchema.post("save", async()=>{
    const userEmail = (await User.findById(this.user)).email;
    sendConfirmationEmail(
        userEmail, 
        this.hotel, 
        this.room, 
        this.totalPerson, 
        this.checkInDate,
        this.checkOutDate,
        this.totalPrice)
})


module.exports = mongoose.model("Booking",bookingSchema);