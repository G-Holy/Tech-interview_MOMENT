const config    = require("../config/index");
const logger    = require("../src/services/loggerService");
const mongoose  = require("mongoose");

/**
 * Class d'abstraction qui encapsule MongoDB
 * 
 * @param {function} serverLauncher - Callback de lancement du serveur web 
 */
class MongooseLoader {
    constructor(serverLauncher) {
        const mongooseOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: true    
        };
        
        /** Lance le serveur seulement si la connexion à la BDD est réussie **/
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