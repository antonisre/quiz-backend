const { Quiz } = require('../models/Quiz');
const { Question } = require('../models/Question');
const { QuestionAnswers } = require('../models/QuestionAnswers');
const axios = require('axios');

const insertData = async () => {
    try {
        const check = await Quiz.findAll({});
        if (check.length > 0) return;
        let questions = [], answers = [];
    
        const { data } = await axios({
            method: "get",
            url: "https://iosquiz.herokuapp.com/api/quizzes",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        data.quizzes.forEach(element => {            
            element.questions.forEach(question => {
                question.QuizId = element.id;
                questions.push(question);

                question.answers.forEach(item => {
                    answers.push({answer: item, QuestionId: question.id})
                })
            })
        });
    
        await Quiz.bulkCreate(data.quizzes);
        await Question.bulkCreate(questions);
        await QuestionAnswers.bulkCreate(answers);
    } catch (err) {
        console.log(err)
    }

}

module.exports = insertData;