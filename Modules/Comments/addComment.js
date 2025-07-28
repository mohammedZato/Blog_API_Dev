const mongoose = require("mongoose");
const validator = require("validator");

const addComment = async (req, res) => {
  const commentsModel = mongoose.model("comments");
  const postsModel = mongoose.model("posts");

  const { body } = req.body;
  const { postId } = req.params;

  if (!body) throw "Write a comment";
  if (!postId) throw "Post ID is required";
  if (!validator.isMongoId(postId)) throw "Invalid post id";

  const getPost = await postsModel.findOne({
    _id: postId,
  });
  if (!getPost) throw "Post cannot be found";

  const newComment = await commentsModel.create({
    body,
    post: postId,
    author: req.user._id,
  });

  res.status(200).json({
    status: "comment added successfully",
    newComment,
  });
};

module.exports = addComment;
