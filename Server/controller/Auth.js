const { verificationMail } = require("../mails/VerificationMail");
const OTP = require("../models/OTP");
const ResetPasswordToken = require("../models/ResetPasswordToken");
const User = require("../models/User");
const { failed, customError } = require("../utils/errorHandler");
const { mailSender } = require("../utils/mailHandler");


exports.verifyEmail = async(req, res)=>{
    try{
        // Fetching
        const userId = req.user.id;
        const { otp } = req.body;

        // Validation
        const fetchOTP = await OTP.findOne({user: userId});
        if(!fetchOTP){
            throw customError('Invalid OTP', 404);
        }
        if(fetchOTP.otp !== otp){
            throw customError('OTP mismatched', 401);
        }

        // Perform task
        await   User.findByIdAndUpdate(userId, {approved: true});

        // Send Response
        res.status(200).json({
            success: true,
            message: 'Successfully verified the user',
        })
    }catch(err){
        failed(res, err);
    }
}
exports.sendOTP = async(req, res)=>{
    try{
        // Fetching
        const userId = req.user.id;

        // Validation
        const user = await User.findById(userId);
        const alreadyGenerated = await  OTP.find({user:userId});

        if(alreadyGenerated.length !==0){
            mailSender(userEmail, 'Suitscape Verification', verificationMail(`${user.firstName} ${user.lastName}`, alreadyGenerated.otp));
            throw customError('Again, OTP Sent successfully', 200);
        }

        // Perform Task
        const otp = Math.floor(Math.random()*900000) + 100000;
        const createOTP = new   OTP({
            user: userId,
            otp: otp,
        })

        // Played a little gamble here (If it works, we will learn something new);
        await   createOTP.save({email: user.email, firstName: user.firstName, lastName: user.lastName});

        // Send Response
        res.status(200).json({
            success: false,
            message: "OTP sent successfully",
        })
    }catch(err){
        failed(res, err);
    }
}
exports.resetPassword = async(req, res)=>{
    try{
        // Fetching
        const { token, emailId, password } = req.body;

        // Validation
        const userId = await   User.findOne({email: emailId});
        if(!userId){
            throw customError('This email ID is not registered');
        }
        const rptToken = await ResetPasswordToken.findOne({user: userId});
        if(!rptToken){
            throw customError('Link not found');
        }
        if(rptToken.token !== token){
            throw customError('Invalid Link')
        }
        
        // Perform Task
        await   User.findByIdAndUpdate(userId, {password: password});

        // Send Response
        res.status(200).json({
            success: true,
            messsage: "Password reset successfully",
        })
    }catch(err){
        failed(res, err);
    }
}
exports.resetPasswordToken = async(req, res)=>{
    try{
        // Fetching
        const { emailId } = req.body;

        // Validation
        const searchUser = await    User.findOne({email: emailId});
        if(!searchUser){
            throw customError('This email Id does not exist', 404);
        }
        const previousRPT = await   ResetPasswordToken.findOne({user: searchUser._id});
        if(previousRPT){
            await   ResetPasswordToken.findByIdAndDelete(previousRPT._id);
        }

        // Perform Task
        const token = crypto.randomBytes(20).toString("hex");

        const generateRPT = new     ResetPasswordToken({
            user: searchUser._id,
            token: token,
        })

        // Played a gamble here
        await   generateRPT.save({email:searchUser.email, firstName: searchUser.firstName, lastName: searchUser.lastName});

        // Send Response
        res.status(200).json({
            success: true,
            message: 'Reset Password Link sent successfully',
        })
    }catch(err){
        failed(res, err);
    }
}