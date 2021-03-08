const joi = require("joi") 

/**
 * Objet contenant les schémas et règles JOI de validation des données du model User
 * 
 * @property {object} registerSchema - Schéma de validation de la route /auth/register
 * @property {object} loginSchema - Schéma de validation de la route /auth/login
 */
const authSchemas = {
    registerSchema: joi.object().keys({
        email: joi.string()
            .email()
            .required()
            .trim()
            .lowercase()
            .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required"
            }),
        password: joi.string()
            .required()
            .min(3)
            .max(15),
        lastname: joi.string()
            .required()
            .trim()
            .lowercase(),
        firstname: joi.string()
            .required()
            .trim()
            .lowercase()        
    }),

    loginSchema: joi.object().keys({
        email: joi.string()
            .email()
            .required()
            .trim()
            .lowercase()
            .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required"
            }),
        password: joi.string()
            .required()
    }),
};

module.exports = authSchemas;