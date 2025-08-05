const mongoose = require("mongoose");
const validator = require("validator");

const getSinglePost = async (req, res) => {
  const postsModel = mongoose.model("posts");
  const { postId } = req.params;

  if (!postId) throw "Post ID is required";
  if (!validator.isMongoId(postId)) throw "Invalid Post ID";

  //   const post = postsModel.findById(postId); alternate way to find a post in model
  const getPost = await postsModel.findOne({ _id: postId }).populate([
    {
      path: "comments",
      options: { sort: { createdAt: -1 } }, // sort comments by newest
    },
    {
      path: "likes",
      select: "username email",
    },
  ]);

  if (!getPost) throw "Post not Available";

  res.status(200).json({
    status: "single post",
    singlePost: getPost,
  });
};

module.exports = getSinglePost;
