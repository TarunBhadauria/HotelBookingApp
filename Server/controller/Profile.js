const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { failed, customError } = require("../utils/errorHandler")


exports.updateUserDetails = async(req, res)=>{
    try{
        // Fetching
        const userId = req.user.id;
        const { dob, gender, phoneNumber, bio } = req.body;

        // Validation
        if(!dob && !gender && !phoneNumber && !bio){
            throw customError("Atleast one field required to update", 404);
        }
        
        // Perform Task
        const user = await  User.findById(userId);
        const profile = await   Profile.findById(user.profile);
        const updatedProfile = await    Profile.findByIdAndUpdate(user.profile, {
            dateOfBirth : dob ? dob: profile.id,
            gender :gender ? gender : profile.gender,
            phoneNumber : phoneNumber ? phoneNumber : profile.phoneNumber,
            bio : bio ? bio : profile.bio,
        }, { new: true });

        // Send Response
        res.status(200).json({
            success: true,
            message: "Successfully Updated the Profile",
            updatedProfile,
        })
    }catch(err){
        failed(res, err);
    }
}
exports.updateProfilePicture = async(req, res)=>{
    try{
        // Fetching
        // Validation
        // Perform Task
        // Send Response
    }catch(err){
        failed(res, err);
    }
}
exports.getUserProfile = async(req, res)=>{
    try{
        // Fetching
        const userId = req.user.id;

        // Perform Task
        const user = await  User.findById(userId);
        const profile = await   Profile.findById(user.profile);

        // Send Response
        res.status(200).json({
            success: true, 
            message: "Successfully Fetched the Profile",
            profile: profile,
        })

    }catch(err){
        failed(res, err);
    }
}
exports.getBookedHotels = async(req, res)=>{
    try{
        // Fetching
        const userId = req.user.id;

        // Perform Task
        const Bookings = await  Booking.find({user: userId});

        // Send Response
        res.status(200).json({
            success: true, 
            message: "Successfully Fetched all the Bookings",
            Bookings
        })
    }catch(err){
        failed(res, err);
    }
}
exports.getNotifications = async(req, res)=>{
    try{
        // Fetching
        const userId = req.user.id;
        const { notificationId } = req.body;

        // Perform Task
        let notification = [];
        if(notificationId){
            notification = await     Notification.findById(notificationId);
        }else{
            const profileId = (await   User.findById(userId)).profile;
            notification = (await     Profile.findById(profileId).populate('Notifications')).notifications;
        }

        // Send Response
        res.status(200).json({
            success: true,
            message: "Successfully Fetched the notifications",
            notification: notification
        })
    }catch(err){
        failed(res, err);
    }
}