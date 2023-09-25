const OTP = require("../models/OTP");
const bcrypt = require('bcrypt')
const { customError, failed } = require("../utils/errorHandler");
const Profile = require('../models/Profile');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification')


exports.signup = async(req, res)=>{
    try{
        // Fetching
        const { email, password, firstName, lastName, accountType } = req.body;

        // Validation
        if(!email || !password || !firstName || !lastName || !accountType){
            throw customError('All fields are required');
        }
        if(password.length < 8){
            throw customError('Minimum Password length should be 8 characters.');
        }
        const alreadyExist = await  User.findOne({email: email});
        if(alreadyExist){
            throw customError('User Already Exist');
        }
        // const recentOtp = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);
        // if(!recentOtp || !recentOtp[0] || recentOtp[0].otp != otp){
        //     throw customError('OTP does not matched', 400);
        // }

        // Perform Task
        const hashPassword = await  bcrypt.hash(password, 10);
        const newProfile = await    Profile.create({
            userImage: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&bold=true`,
        })

        const createUser = await    User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            accountType: accountType,
            profile: newProfile._id,
        })


        // Response
        res.status(200).json({
            success: true,
            message: 'Account Created Successfully'
        })
    }catch(err){
        failed(res, err);
    }
}
exports.login = async(req, res)=>{
    try{
        // Fetching Data
        const { email, password, deviceId } = req.body;
    
        // Validation
        if(!email || !password || !deviceId){
            throw customError('All fields are required', );
        }
        const user = await  User.findOne({email: email}).select('password profile email accountType');
        if(!user){
            throw customError('Unable to find the user')
        }
        const matched= await    bcrypt.compare(password, user.password);
        if(!matched){
            throw customError('Wrong Password, Try again later',);
        }

        // Perform Task
        const payload = {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
        }
        console.log(payload);
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '30d'});
        const notify = await    Notification.create({
            heading: "New Login",
            message: `New LoggedIn with device: ${deviceId}`,
        })
        await   Profile.findByIdAndUpdate(user.profile, {
            $push: {
                notifications: notify._id,
            }
        })
        
        // Send Response
        res.cookie('token', jwtToken, {
            expires: new Date(Date.now() + (30*24*60*60)),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        .status(200).json({
            success: true,
            message: 'Successfully Logged In',
        })
    }catch(err){
        failed(res, err);
    }
}
exports.changePassword = async(req, res)=>{
    try{
        // Fetching
        const { oldPassword, newPassword, confirmPassword }= req.body;
        const userId = req.user.id;

        // Validation
        if(!oldPassword || !newPassword || !confirmPassword){
            throw customError('All fields are required', 404);
        }
        if(newPassword !== confirmPassword){
            throw customError('New Password and Confirm Password should be same', );
        }
        if(newPassword.length < 8){
            throw customError('Password must be more than 8 characters');
        }
        const user = await  User.findById(userId).select('password userId profile');
        if(!(await    bcrypt.compare(oldPassword, user.password))){
            throw customError('Old Password does not matched',);
        }

        // Perform Task
        console.log(user);
        const hashedPassword = await    bcrypt.hash(newPassword, 10);
        await   User.findByIdAndUpdate(userId, {password: hashedPassword});
        const notify = await    Notification.create({
            heading: "Password Changed Successfully",
            message: `Your last password changed at ${Date.now()}`
        })
        await   Profile.findByIdAndUpdate(user.profile, {
            $push: {
                notifications: notify,
            }
        })

        // Send Response
        res.status(200).json({
            success: true,
            message: 'Successfully updated the password',
        })
    }catch(err){
        failed(res, err);
    }
}
exports.deleteUser = async(req, res)=>{
    try{
        // Fetching Data
        const userId = req.user.id;
        const { password } = req.body;

        // Validation
        if(!password){
            throw customError('Unable to get password', 404);
        }
        const user = await  User.findById(userId).select("password profile");
        if(!user){
            throw customError('Unable to find the User',);
        }
        if(!(await    bcrypt.compare(password, user.password))){
            throw customError("Unable to Verify User", );
        }

        // Perform Task
        await   Profile.findByIdAndDelete(user.profile);
        await   User.findByIdAndDelete(userId);

        // Send Response
        res.status(200).json({
            success: true,
            message: 'Account Delete successfully'
        })
    }catch(err){
        failed(res, err);
    }
}