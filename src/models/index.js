const db = require('../config/database');
const { User } = require('./User');
const { Quiz } = require('./Quiz');
const { Question  } = require('./Question');
const { QuestionAnswers } = require('./QuestionAnswers');
const { Leadboard } = require('./Leadboard');

async function databaseInit() {
    try {
        await db.authenticate();
        console.log('DB connection has been established successfully.');

       //relations
        Quiz.hasMany(Question, { as: 'questions' });
        Question.hasMany(QuestionAnswers, { as: 'answers' }); 
        User.belongsToMany(Quiz, { through: Leadboard, foreignKey: 'UserId' });
        Quiz.belongsToMany(User, { through: Leadboard, foreignKey: 'QuizId' }); 

        //sync db
        await db.sync();
        console.log("All models were synchronized successfully.");
    } catch (err) {
        console.log('Failed to init db', err);
        process.exit();
    }
}

module.exports = databaseInit;