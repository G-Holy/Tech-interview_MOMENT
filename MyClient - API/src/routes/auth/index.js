const authController = require("../../controllers/authController");
const authMidleware = require("../../middlewares/auth");

const express = require("express");
const authRouter = express.Router();

//  POST auth/register
authRouter.post("/register", authController.registerUser);

//  POST auth/login
authRouter.post("/login", authController.loginUser);

//  GET auth/me AUTH
authRouter.get("/me", authMidleware, authController.getAuthenticatedUser);

//  POST auth/me AUTH
authRouter.get("/logout", authMidleware, authController.logoutUser);

module.exports = authRouter;