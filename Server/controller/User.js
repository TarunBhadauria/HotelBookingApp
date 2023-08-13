const OTP = require("../models/OTP");
const bcrypt = require('bcrypt')
const { failed } = require("../utils/errorHandler");


exports.signup = async(req, res)=>{
    try{
        // Fetching
        const { email, password, firstName, lastName, accountType, otp } = req.body;

        // Validation
        if(!email || !password || !firstName || !lastName || !accountType || !otp){
            throw customError('All fields are required');
        }
        if(password.length < 8){
            throw customError('Minimum Password length should be 8 characters.');
        }
        const alreadyExist = await  User.findOne({email: email});
        if(alreadyExist){
            throw customError('User Already Exist with password: ', alreadyExist.password);
        }
        const recentOtp = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);
        if(!recentOtp || !recentOtp[0] || recentOtp[0].otp != otp){
            throw customError('OTP does not matched', 400);
        }

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

    }catch(err){
        failed(res, err);
    }
}
exports.changePassword = async(req, res)=>{
    try{

    }catch(err){
        failed(res, err);
    }
}
exports.deleteUser = async(req, res)=>{
    try{

    }catch(err){
        failed(res, err);
    }
}