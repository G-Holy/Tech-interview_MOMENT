const joi = require("joi");

const joiValidation = (schema) => { 
    return (req, res, next) => { 
        const { error } = schema.validate(req.body); 

        if (!error) { 
            next(); 
        } else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
            res.status(422).json({ error: message }) } 
    } 
} 

module.exports = joiValidation;