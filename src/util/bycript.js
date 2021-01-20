const bcrypt = require('bcrypt');
const responseCodes = require('../util/responseCodes.json');
const statusCodes = require('./statusCodes.json');
const responseMessages = require('../util/responseMessages.json')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
    });
}

const comparePassword = async (password, user) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) { 
        throw { message: responseMessages.wrongPassword, code: responseCodes.wrongPassword, statusCode: statusCodes.UNAUTHORIZED };
    }
}

module.exports = {
    hashPassword,
    comparePassword
}