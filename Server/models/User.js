const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        requrequired:true
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Owner","User"]
    },
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },
    hotels:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    },
    image:{
        type:String
    },
    token:{
        type:String,
    },
    resetPassword:{
        type:Date   
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdditionalDetails"
    }
})

module.exports = mongoose.Model("User",userSchema);