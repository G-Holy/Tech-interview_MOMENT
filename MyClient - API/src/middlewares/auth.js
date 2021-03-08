const config  = require("../../config/index");
const jwt     = require("jsonwebtoken");

/**
 * Middleware d'authentification
 * Vérifie l'existance et la validité d'un jsonWebToken dans le header d'une requête
 * 
 * @function
 * @param {Object} req - Objet Express de requête
 * @param {Object} res - Objet Express de réponse
 * @param {Function} next - Fonction Express d'appel du prochain middleware
 * @return {undefined}
 */
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");    
    if (!token)
      return res.status(401).send({ success: false, message: "Please authenticate" });
    console.log(token);
    jwt.verify(token, config.secret, (e, payload) => {
      if (e)
        return res.status(500).send({ success: false, message: "Error while processing token"});

      req.token = token;
      req.userId = payload.id;
      next();
    });   
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;