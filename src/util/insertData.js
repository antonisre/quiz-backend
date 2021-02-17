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
            element.id == 4 ? element.image = "https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg" : 
            element.id == 5 ? element.image = "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/99799/s960_30_05_20_GovUK2.jpg" :
            element.id == 6 ? element.image = "https://www.sciencenews.org/wp-content/uploads/2020/05/052020_ts_scientific-words_feat-1028x579.jpg" : null; 
            
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