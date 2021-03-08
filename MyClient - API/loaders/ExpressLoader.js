const config        = require("../config/index");
const createError   = require('http-errors');
const express       = require("express");
const logger        = require("../src/services/loggerService");
const morgan        = require("morgan");
const routes        = require("../src/routes/index");
const swaggerJSDoc  = require("swagger-jsdoc");
const swaggerParam  = require('../swagger.json');
const swaggerUi     = require("swagger-ui-express");

/**
 * Classe d'abstraction qui encapsule Express
 * 
 * @property {object} app - Object d'application Express
 */
class ExpressLoader {
    constructor () {
        const app = express();

        /** Configuration d'express **/
        app.use(express.json({limit: "20mb"}));
        app.use(express.urlencoded({ extended: true }));

        /** Middleware **/
        app.use(morgan('dev'));

        const swaggerSpec = swaggerJSDoc(swaggerParam);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        /** Expose les routes **/
        routes(app);

        app.use(function (req,res,next) {
	        next(createError(404));
        });
        
        /** Middleware de gestion d'erreurs **/
        app.use(ExpressLoader.errorHandler);
        
        this.app = app;
    }

    /** Retourne une instance du serveur Express **/
    get Server () {
        return this.server;
    }

    /** Expose le serveur web sur le port du fichier de configuration **/
   launch() {
        this.server = this.app.listen(config.port, () => {
            logger.info(`Express server running, now listening on port ${config.port}`);
        });
   }

   /** Middleware de gestion des erreurs **/
    static errorHandler (error, req, res, next) {

        /** Une réponse a déjà été envoyée **/
        if (res.headersSent)
            return next(error);

        var parsedError;
        try {
            parsedError = (error && typeof error === "object") ? JSON.stringify(error) : error;
        } catch (e) {
            logger.error(e);
        }

        if (!error.status) {
            logger.error(parsedError);
            return res.status(500).send({sucess:false, message:"Something broke!"});
        }

        return res.status(error.status).json({ success:false, error: error.message });
    }
}

module.exports = ExpressLoader;