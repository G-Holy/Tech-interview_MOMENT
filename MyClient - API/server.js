const config = require("./config/index.js");
const fs = require( 'fs' );

/** Create log directory if it does not exist **/
if ( !fs.existsSync( config.logDir ) ) {
    fs.mkdirSync( config.logDir );
}

// TODO RENDRE L'INIT DE LA DB BLOQUANT
/** Setup DB **/ // RENDRE CA BLOQUANT POUR LA SUITE
require("./db/mongoose");

/** Setup Server service **/
const ExpressLoader = require( "./loaders/ExpressLoader" );
var server = new ExpressLoader();

module.exports = server;
