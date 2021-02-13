'use strict';

const responseHandler = require('../util/responseHandler');
const { findQuizes } = require('../models/Quiz');

const getQuizes = async (req, res) => {
    try {
        let quizzes = await findQuizes();
        responseHandler.successResponse(res, { data: {
            quizzes
        }});
    } catch (err) {
        console.log(err)
        responseHandler.errorResponse(res, err);
    }
}

module.exports = {
    getQuizes
}