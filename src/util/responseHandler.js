const statusCodes = require("./statusCodes.json");

function successResponse(response, success) {
    let {code, data, message } = success; 
    
    if (!message) message = "Success!"
    return response.status(statusCodes.OK).json({
        code,
        message,
        data
    });
}

function errorResponse(response, error) {
    let { statusCode, message, code } = error;
    if (!statusCode) statusCode = statusCodes.SERVER_ERROR;
    if (!message || message == "") message = "Something went wrong!";
    if (error.parent) { message = error.parent.sqlMessage; code = error.parent.errno; statusCode = statusCodes.BAD_REQUEST; }
    return response.status(statusCode).json({
        code,
        message
    })
}

module.exports = {
    successResponse,
    errorResponse
}