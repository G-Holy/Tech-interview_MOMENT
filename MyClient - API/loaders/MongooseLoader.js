const config    = require("../config/index");
const logger    = require("../src/services/loggerService");
const mongoose  = require("mongoose");

class MongooseLoader {
    constructor(serverLauncher) {
        const mongooseOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: true    
        };
        
        /** Launch server only if connection to database is successful **/
        mongoose.connect(config.dbUrl, mongooseOptions)
        .then( () => {
            logger.info(`Database connection to ${config.dbUrl} successful`);
            serverLauncher();
        })
        .catch(e => {
            logger.error(e);
            process.exit(1);
        });
    }
}

module.exports = MongooseLoader;