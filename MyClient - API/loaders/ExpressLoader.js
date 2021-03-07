const config    = require("../config/index");
const express   = require("express");
const logger    = require("../src/services/loggerService");
const morgan    = require("morgan");
const routes    = require("../src/routes/index");
class ExpressLoader {
    constructor () {
        const app = express();

        /** Express configuration **/
        app.use(express.json({limit: "20mb"}));
        app.use(express.urlencoded({ extended: true }));

        /** Set up middleware **/
        app.use(morgan('dev'));

        /** Pass app instance to routes **/
        routes(app);
        
        /** Setup error handling, this must be after all other middleware **/
        app.use(ExpressLoader.errorHandler);
        
        this.app = app;
    }

    /** Server instance getter **/
    get Server () {
        return this.server;
    }

    /** Launch server **/
   launch() {
        this.server = this.app.listen(config.port, () => {
            logger.info(`Express server running, now listening on port ${config.port}`);
        });
   }
    static errorHandler (error, req, res, next) {
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