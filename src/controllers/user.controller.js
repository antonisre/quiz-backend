'use strict';

const responseHandler = require('../util/responseHandler');
const { createUser, findUserBySigninCredentials } = require('../models/User');
const { generateToken } = require('../util/tokenHandler');
const { comparePassword } = require('../util/bycript');

const signup = async (req, res) => {
    try {
        let newUser = await createUser(req.body);
        const token = generateToken(newUser);
        delete newUser.password;

        responseHandler.successResponse(res, { data: {
            token: token.toString(),
            newUser
        }})
    } catch (err) {
        console.log(err)
        responseHandler.errorResponse(res, err);
    }
}

const signin = async (req, res) => {
    try {
        let user = await findUserBySigninCredentials(req.body);
        await comparePassword(req.body.password, user)
        const token = generateToken(user);
        delete user.password;

        responseHandler.successResponse(res, { data: {
            token: token.toString(),
            user
        }})
    } catch (err) {
        console.log(err)
        responseHandler.errorResponse(res, err);
    }
}

module.exports = {
    signup,
    signin
}