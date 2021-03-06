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

   static errorHandler ( error, req, res, next ) {}
}

module.exports = ExpressLoader;