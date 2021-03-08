/**
 * Objet contenant les informations de configuration de l'API
 * 
 * @property {string} dbUrl - url de connexion de la BDD
 * @property {string} port - port d'exposition du serveur web
 * @property {string} env - état de l'environnement du serveur
 * @property {string} logDir - nom du dossier de logs
 * @property {string} secret - clé secrète pour la génération de token
 */
const config = {
  dbUrl: process.env.DB_URL || "mongodb://localhost/backup-db",
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  logDir: process.env.LOGDIR || "logs",
  secret: process.env.JWT_SECRET
};

module.exports = config;