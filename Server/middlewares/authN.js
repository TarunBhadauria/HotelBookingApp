const User = require('../models/User');
const {customError, failed} = require('../utils/errorHandler');
const jwt = require('jsonwebtoken')

const authN = async(req, res, next) => {
    try{
        //  Fetch Token
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '') || req.body?.token;

        //  Validate Token
        if(!token){
            throw customError('Unable to get token', 401);
        }

        //  Verify Token
        try{
            const check=jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = check;
        }catch(err){
            throw customError('Unable to verify token', 403);
        }
        if(!(await User.findById(req.user.id))){
            throw customError('Unable to find User', 404);
        }

        //  Move Forwares
        next();
    }catch(err){
        failed(res, err);
    }
}

module.exports = authN