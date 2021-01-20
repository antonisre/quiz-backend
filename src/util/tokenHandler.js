const jwt = require("jsonwebtoken");
const statusCode = require("./statusCodes.json");

const generateToken = data => {
    try {
        const secret = process.env.JWT_SECRET;
        const tokenValidInterval = parseInt(process.env.JWT_EXPIRES);
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + tokenValidInterval, data: {
            userID: data.id, 
            role : data.role
        }}, secret);
        return token;
    } catch (err) {
        console.log(err);
        throw { statusCode: statusCode.SERVER_ERROR, message: "Failed to create token!" };
    }
}

const validateToken = token => {
    try {
        const secret = process.env.JWT_SECRET;
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;
    } catch(err) {
        console.log(err);
        throw { statusCode: statusCode.UNAUTHORIZED, message: "Invalid token." };
    }
}

module.exports = {
    generateToken,
    validateToken
}