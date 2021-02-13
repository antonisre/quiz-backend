const db = require('../config/database');
const Sequelize = require('sequelize');

const Question = db.define('Question', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: Sequelize.STRING
    },
    correct_answer: {
        type: Sequelize.STRING
    }
});

module.exports = {
    Question
}