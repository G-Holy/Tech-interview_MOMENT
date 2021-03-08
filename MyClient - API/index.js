const config            = require("./config/index");
const ExpressLoader     = require("./loaders/ExpressLoader");
const fs                = require("fs");
const MongooseLoader    = require("./loaders/MongooseLoader");

/** crée le dossier de log si il n'existe pas déjà **/
!fs.existsSync(config.logDir) && fs.mkdirSync(config.logDir);

/** Tente de connecter à la BDD avant de démarrer le serveur web **/
var server;
new MongooseLoader(() => {
    server = new ExpressLoader();
    server.launch();
});

module.exports = server;