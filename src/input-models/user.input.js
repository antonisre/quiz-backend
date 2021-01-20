const Joi = require('joi') 
const schemas = { 
    signupParams: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }) .options({ abortEarly: false }),
    signinParams: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }) .options({ abortEarly: false })
}; 

module.exports = schemas;