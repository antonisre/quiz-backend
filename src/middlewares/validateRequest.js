const responseHandler = require('../util/responseHandler');
const responseCodes = require('../util/responseCodes.json');
const statusCodes = require('../util/statusCodes.json');
const Joi = require('joi'); 

const validateRequest = (schema, property) => { 
    return (req, res, next) => {
        const { error } = Joi.validate({ ...req.body, ...req.params, ...req.query }, schema); 
        const valid = error == null; 
        
        if (valid) { 
            next(); 
        } else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
        
            console.log("error validating schema", message);
            responseHandler.errorResponse(res, { statusCode: 422, message });
        } 
    } 
}

module.exports = validateRequest;