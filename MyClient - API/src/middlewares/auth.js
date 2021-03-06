const config  = require("../../config/index");
const jwt     = require("jsonwebtoken");

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