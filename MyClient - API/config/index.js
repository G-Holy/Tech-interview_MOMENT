const config = {
  dbUrl: process.env.DB_URL || "mongodb://localhost/backup-db",
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  logDir: process.env.LOGDIR || "logs",
  secret: process.env.JWT_SECRET
};

module.exports = config;