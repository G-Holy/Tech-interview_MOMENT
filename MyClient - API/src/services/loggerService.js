const config = require('../../config/index.js');
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { time: new Date().toISOString() },
  transports: [
    
    /**
     * Ecrit les logs de type `error` dans `error.log`
     * Ecrit les logs de type `info` dans `combined.log`
     */
    new winston.transports.File({ filename: path.join(config.logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(config.logDir, 'combined.log') }),
  ],
});

/* Si le serveur n'est pas en production écrit les log dans la consoles */
if (process.env.ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;