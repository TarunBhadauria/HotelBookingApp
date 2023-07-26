const mongoose = require('mongoose');

const additionalDetailsSchema = new mongoose.Schema({
    dob:{
        type:Date
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    email:{
        type:String,
    },
    userImage:{
        type:String
    }
});

module.exports = mongoose.Model("AdditionalDetails",additionalDetailsSchema);