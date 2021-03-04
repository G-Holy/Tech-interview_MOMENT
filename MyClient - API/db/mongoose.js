const mongoose = require("mongoose");
const logger = require('../src/services/Logger.js');


var  launchDatabase = (async function f() {
  let connect = new Promise((resolve, reject) => {
      mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true
    })
    .then( () => {
      logger.info( "Database connection successful" );
      resolve();
    })
    .catch(error => {
      console.log(error);
      reject();
    });
  });
  let safetyBreak = await connect;
})()
