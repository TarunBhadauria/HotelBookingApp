const error = (message, code)=>{
    const err = new Error(message);
    err.code = code;
    return err;
}

const response = (res, err)=>{
    res.status(err.code ? err.code : 500).json({
        success: false,
        message: err.message,
    })
}

exports.customError = error;
exports.failed = response;