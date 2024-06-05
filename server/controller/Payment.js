const { failed } = require("../utils/errorHandler")


exports.capturePayment = async(req, res)=>{
    try{

    }catch(err){
        failed(res, err);
    }
}

exports.verifyPayment = async(req, res)=>{
    try{

    }catch(err){
        failed(res, err);
    }
}