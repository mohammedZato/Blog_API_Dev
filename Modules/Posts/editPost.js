const mongoose = require("mongoose");
const validator = require("validator");

const editPost = async (req, res) => {
  const postsModel = mongoose.model("posts");
  const { title, body, postId } = req.body;

  if (!title) throw "Enter a title";
  if (!body) throw "Enter a body for the blog";
  if (!postId) throw "Enter post ID";
  if (!validator.isMongoId(postId.toString())) throw "Invalid post id";

  const getPost = await postsModel.findOne({
    _id: postId,
  });
  if (!getPost) throw "Post cannot be found";

  await postsModel.updateOne(
    {
      _id: postId,
    },
    {
      title,
      body,
    },
    {
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "editted post successfully",
  });
};

module.exports = editPost;
