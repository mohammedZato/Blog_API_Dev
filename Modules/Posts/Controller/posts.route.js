const express = require("express");
const addPost = require("../addPost");
const authHandler = require("../../../Middleware/auth");
const deletePost = require("../deletePost");
const editPost = require("../editPost");
const allPosts = require("../getAllPost");
const addComment = require("../../Comments/addComment");
const getSinglePost = require("../getSinglePost");
const likePost = require("../../Likes/likes");

const postsRoutes = express.Router();

postsRoutes.use(authHandler);

postsRoutes.post("/addPost", addPost);
postsRoutes.delete("/:postId", deletePost);
postsRoutes.patch("/editPost", editPost);
postsRoutes.get("/", allPosts);
postsRoutes.post("/:postId/addComment", addComment);
postsRoutes.get("/:postId", getSinglePost);
postsRoutes.post("/:postId/likePost", likePost);

module.exports = postsRoutes;
