'use strict';

const responseHandler = require('../util/responseHandler');
const { findUsersResults, saveQuizResult, fetchLeadboardByQuiz } = require('./../models/Leadboard');

const insertUserResult = async (req, res) => {
    try {
        const { time, points, QuizId } = req.body;
        const { userID } = req.user;
        const usersResults = await findUsersResults(userID, QuizId);

        !usersResults || (usersResults.dataValues.points < points) ? await saveQuizResult({ UserId: userID, QuizId, time, points }) : 
        (usersResults.dataValues.time > time) ? await saveQuizResult({ UserId: userID, QuizId, time }) : null;

        responseHandler.successResponse(res, {});
    } catch (err) {
        console.log(err)
        responseHandler.errorResponse(res, err);
    }
}

const getLeadboardsById = async (req, res) => {
    try {
        const leadboards = await fetchLeadboardByQuiz(req.query);

        responseHandler.successResponse(res, { data: {
            leadboards
        }});
    } catch (err) {
        console.log(err)
        responseHandler.errorResponse(res, err);
    }
}

module.exports = {
    insertUserResult,
    getLeadboardsById
}