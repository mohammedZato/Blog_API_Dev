const express = require("express");
const addPost = require("../addPost");
const authHandler = require("../../../Middleware/auth");
const deletePost = require("../deletePost");
const editPost = require("../editPost");
const allPosts = require("../getAllPost");

const postsRoutes = express.Router();

postsRoutes.use(authHandler);

postsRoutes.post("/addPost", addPost);
postsRoutes.delete("/:postId", deletePost);
postsRoutes.patch("/editPost", editPost);
postsRoutes.get("/", allPosts);

module.exports = postsRoutes;
