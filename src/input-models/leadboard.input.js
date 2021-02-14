const Joi = require('joi') 
const schemas = { 
    saveResult: Joi.object().keys({
        QuizId: Joi.number().required(),
        time: Joi.number().required(),
        points: Joi.number().required(),
    }) .options({ abortEarly: false }),
    getLeadboards: Joi.object().keys({
        QuizId: Joi.number().required(),
        page: Joi.number().min(1).required(),
        resultsPerPage: Joi.number().required(),
    }) .options({ abortEarly: false }),
}; 

module.exports = schemas;