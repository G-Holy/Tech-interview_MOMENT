const auth = require("./auth");

const routes = app => {
    
    /** Autorise le CORS **/
    app.use((req, res, next) => {
        res.setHeader( "Access-Control-Allow-Origin", "*" );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, content-type, x-access-token, authorization, Accept, Origin"
        );
        res.setHeader( "Access-Control-Allow-Credentials", true );
        res.removeHeader( "X-Powered-By" );
        next();
    });

    /** Routes d'authentification **/
    app.use("/auth", auth);
};

module.exports = routes;