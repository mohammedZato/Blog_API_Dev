const express = require("express");
const register = require("../register");
const login = require("../login");
const forgotPassword = require("../forgotPassword");

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpw", forgotPassword);

module.exports = userRoutes;
