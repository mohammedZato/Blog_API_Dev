const mongoose = require("mongoose");
const validator = require("validator");

const likePost = async (req, res) => {
  const postsModel = mongoose.model("posts");
  const { postId } = req.params;
  const userId = req.user._id;

  if (!validator.isMongoId(postId)) throw "Invalid Post ID";

  const getPost = await postsModel.findById(postId);
  if (!getPost) throw "Post cannot be found";

  const hasLiked = getPost.likes.includes(userId);
  if (!hasLiked) {
    //like post
    getPost.likes.push(userId);
  } else {
    //unlike post
    getPost.likes.pull(userId);
  }

  await getPost.save();

  res.status(200).json({
    status: "success",
    message: "You liked this post",
    numberOfLikes: getPost.likes.length,
  });
};

module.exports = likePost;
