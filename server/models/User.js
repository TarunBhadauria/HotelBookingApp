const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required: true,
        sparse:true
    },
    password:{
        type:String,
        required:true,
        select: false,
        minLenght: 8,
    },
    accountType:{
        type:String,
        enum:["owner","user", "admin"]
    },
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }],
    hotels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    }],
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    approved:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("User", userSchema);