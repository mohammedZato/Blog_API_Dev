const express = require("express");
// const addPost = require("../addPost");
const authHandler = require("../../../Middleware/auth");

const postsRoutes = express.Router();

postsRoutes.use(authHandler);

module.exports = postsRoutes;
