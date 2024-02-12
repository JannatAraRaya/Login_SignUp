const express = require("express");
const routes = express();
const AuthController= require("../controller/authController")

routes.post("/sign-up",AuthController.signUp);
routes.post("/verify-email/:token/:userId",AuthController.verifyEmail);

module.exports = routes;