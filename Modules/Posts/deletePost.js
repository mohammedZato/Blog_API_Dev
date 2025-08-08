const mongoose = require("mongoose");
const validator = require("validator");
const redisClient = require("../../config/redis");

const deletePost = async (req, res) => {
  const postsModel = mongoose.model("posts");
  const { postId } = req.params;

  if (!validator.isMongoId(postId.toString())) throw "Invalid post id";

  const getPost = await postsModel.findOne({
    _id: postId,
  });
  if (!getPost) throw "Post does not exist or cant be found";

  await postsModel.deleteOne({
    _id: postId,
  });

  await redisClient.del(`post:${postId}`);

  res.status(201).json({
    status: "success",
    message: "post deleted successfully",
  });
};
module.exports = deletePost;
