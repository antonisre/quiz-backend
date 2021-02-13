const db = require('../config/database');
const Sequelize = require('sequelize');
const { Question } = require('./Question');
const { QuestionAnswers } = require('./QuestionAnswers');

const Quiz = db.define('Quiz', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING,
    },
    level: {
        type: Sequelize.INTEGER,
    },
    image: {
        type: Sequelize.STRING
    }
});

const findQuizes = async () => {
    const quizes = await Quiz.findAll({
        include: [{
            model: Question,
            as: 'questions',
            include: [{
                model: QuestionAnswers,
                as: 'answers'
            }]
        }]
    });
    return quizes.map(quiz => quiz.dataValues);
}
module.exports = {
    Quiz,
    findQuizes
}