const db = require('../config/database');
const { Quiz }  =require('./Quiz');
const { Question }  =require('./Question');
const { QuestionAnswers }  =require('./QuestionAnswers');

async function databaseInit() {
    try {
        await db.authenticate();
        console.log('DB connection has been established successfully.');

       //relations
        Quiz.hasMany(Question, { as: 'questions' });
        Question.hasMany(QuestionAnswers, { as: 'answers' }); 

        //sync db
        await db.sync();
        console.log("All models were synchronized successfully.");
    } catch (err) {
        console.log('Failed to init db', err);
        process.exit();
    }
}

module.exports = databaseInit;