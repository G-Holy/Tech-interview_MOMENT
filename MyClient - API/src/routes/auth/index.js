const authController        = require("../../controllers/authController");
const authMiddleware        = require("../../middlewares/auth");
const express               = require("express");
const validationMiddleware  = require("../../middlewares/validation");
const schemas               = require("./validationSchemas");

const authRouter = express.Router();


//  POST auth/register
authRouter.post("/register", validationMiddleware(schemas.registerSchema), authController.registerUser);

//  POST auth/login
authRouter.post("/login", validationMiddleware(schemas.loginSchema), authController.loginUser);

//  GET auth/me AUTH
authRouter.get("/me", authMiddleware, authController.getAuthenticatedUser);

//  POST auth/me AUTH
authRouter.get("/logout", authMiddleware, authController.logoutUser);

module.exports = authRouter;