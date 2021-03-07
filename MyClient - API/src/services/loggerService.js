const config = require('../../config/index.js');
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { time: new Date().toISOString() },
  transports: [
    
    /**
     * Write all logs with level `error` and below to `error.log`
     * Write all logs with level `info` and below to `combined.log`
     */
    new winston.transports.File({ filename: path.join(config.logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(config.logDir, 'combined.log') }),
  ],
});

/* If we're not in production then log to the console */
if (process.env.ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;