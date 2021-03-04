const config    = require("../config/index.js");
const express   = require("express");
const logger    = require("../src/services/Logger.js");
const morgan    = require( 'morgan' );

class ExpressLoader {
    constructor () {
        const app = express();

        /** Express configuration **/
        app.use(express.json({limit: "20mb"}));
        app.use(express.urlencoded({ extended: true }));

        /** Set up middleware **/
        app.use(morgan('dev'));

        /** Enable CORS **/
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
            next();
        });

        /** Routes **/
        app.get('/', function(req, res) {
            res.send('hello world');
        });

        this.app = app;
    }



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