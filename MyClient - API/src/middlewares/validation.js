const joi = require("joi");

const joiValidation = (schema) => { 
    return (req, res, next) => { 
        const { error } = schema.validate(req.body); 

        if (!error) { 
            return next(); 
        } else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
            return res.status(422).json({sucess:false, error: message }) } 
    } 
} 

module.exports = joiValidation;