const authController        = require("../../controllers/authController");
const authMiddleware        = require("../../middlewares/auth");
const express               = require("express");
const validationMiddleware  = require("../../middlewares/validation");
const schemas               = require("./validationSchemas");

const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Enregistre un nouvel utilisateur
 *      tags:
 *          - authentification
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: L'utilisateur est créé dans la base de donnée, un token d'authentification est renvoyé
 *          409:
 *              description: Cet email n'est pas disponible
 *          422:
 *              description: Des champs sont manquants ou invalides
  */
authRouter.post("/register", validationMiddleware(schemas.registerSchema), authController.registerUser);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Authentifie un utilisateur
 *      tags:
 *          - authentification
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: L'utilisateur reçoit un token d'authentification
 *          403:
 *              description: L'email ou le mot de passe est incorrect
 *          422:
  *              description: Des champs sont manquants ou invalides
 * 
 */
authRouter.post("/login", validationMiddleware(schemas.loginSchema), authController.loginUser);

/**
 * @swagger
 * /auth/me:
 *  get:
 *      summary: Affiche les informations de l'utilisateur authentifié
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentification
 *      responses:
 *          200:
 *              description: L'utilisateur reçoit un token d'authentification
 *          401:
 *              description: Le token d'authentification est manquant ou invalide
 * 
 */
authRouter.get("/me", authMiddleware, authController.getAuthenticatedUser);

/**
 * @swagger
 * /auth/logout:
 *  get:
 *      summary: Déconnecte un utilisateur
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentification
 *      responses:
 *          200:
 *              description: Le serveur a bien reçu la demande de déconnexion de l'utilisateur authentifié
 *          401:
 *              description: Le token d'authentification est manquant ou invalide
 */
authRouter.get("/logout", authMiddleware, authController.logoutUser);

module.exports = authRouter;