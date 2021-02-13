const db = require('../config/database');
const Sequelize = require('sequelize');

const QuestionAnswers = db.define('QuestionAnswers', {
    answer: {
        type: Sequelize.STRING
    }
});

module.exports = {
    QuestionAnswers
}