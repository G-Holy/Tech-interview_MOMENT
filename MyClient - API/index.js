const config            = require("./config/index");
const ExpressLoader     = require("./loaders/ExpressLoader");
const fs                = require("fs");
const MongooseLoader    = require("./loaders/MongooseLoader");

/** Create log directory if it does not exist **/
!fs.existsSync(config.logDir) && fs.mkdirSync(config.logDir);

/** Connect to database then launch server if succesful **/
var server;
new MongooseLoader(() => {
    server = new ExpressLoader();
    server.launch();
});

module.exports = server;