const { customError, failed } = require("../utils/errorHandler");


const isOwner = (req, res, next)=>{
    try{
        // Fetch account type
        const { accountType } = req.user;

        // Validate Account type
        if(!accountType){
            throw customError('Unable get type of user', 404);
        }

        // Verify account type
        if(accountType !== 'owner'){
            throw customError('You are not a owner', 403);
        }

        // Move forward
        next();
    }catch(err){
        failed(res, err);
    }
}


const isUser = (req, res, next)=>{
    try{
        // Fetch account type
        console.log(req.user);
        const { accountType } = req.user;

        // Validate Account type
        if(!accountType){
            throw customError('Unable get type of user', 404);
        }

        // Verify account type
        if(accountType !== 'user'){
            throw customError('You are not a user', 403);
        }

        // Move forward
        next();
    }catch(err){
        failed(res, err);
    }
}

const isAdmin = (req, res, next)=>{
    try{
        // Fetch account type
        const { accountType } = req.user;

        // Validate Account type
        if(!accountType){
            throw customError('Unable get type of user', 404);
        }

        // Verify account type
        if(accountType !== 'admin'){
            throw customError('You are not a admin', 403);
        }

        // Move forward
        next();
    }catch(err){
        failed(res, err);
    }
}

exports.isAdmin = isAdmin;
exports.isOwner = isOwner;
exports.isUser = isUser;