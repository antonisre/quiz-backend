const db = require('../config/database');
const Sequelize = require('sequelize');
const { isRef } = require('joi');
const { User } = require('./User');
const { Quiz } = require('./Quiz');

const Leadboard = db.define('Leadboard', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    time: {
        type: Sequelize.INTEGER
    },
    points: {
        type: Sequelize.INTEGER
    },
    
},
{
    indexes: [
        {
            unique: true,
            fields: ['UserId', 'QuizId']
        }
    ]
});

const saveQuizResult = async (results) => {
    const { UserId, QuizId, time, points } = results;
    await Leadboard.upsert({ UserId, QuizId, time, points });
}

const findUsersResults = async (UserId, QuizId) => {
    const results = await Leadboard.findOne({
        where: {
            UserId,
            QuizId
        }
    })
    return results;
}

const fetchLeadboardByQuiz = async find => {
    const { QuizId } = find;
    const leadboard = await Leadboard.findAll({
        where: { QuizId: QuizId },
        order: [
            ['points', 'DESC'],
            ['time', 'ASC'],
        ],
        include: [
            User,
            Quiz
        ]
    });
    return leadboard.map(user => user.dataValues);
}

module.exports = {
    Leadboard,
    saveQuizResult,
    findUsersResults,
    fetchLeadboardByQuiz
}