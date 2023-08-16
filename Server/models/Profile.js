const mongoose = require('mongoose');

const  profileSchema = new mongoose.Schema({
    dateOfBirth:{
        type:Date,
    },
    gender: {
        type:String,
        enum:["Male","Female", "Others"]
    },
    phoneNumber:{
        type:String,
    },
    userImage:{
        type:String
    },
    bio: {
        type: String,
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
    }]
});

module.exports = mongoose.Model("Profile", profileSchema);