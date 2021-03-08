const joi = require("joi");

/**
 * Générateur du middleware de validation de données
 * Le middleware créé vérifie l'existance et l'intégrité des données d'une requête selon un schema Joi
 * 
 * @function
 * @param {Object} schema - Schema Joi
 * @return {function} - Fonction middleware instancié selon un schéma Joi
 */
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