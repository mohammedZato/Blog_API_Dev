const mongoose = require("mongoose");

const allPosts = async (req, res) => {
  const postsModel = mongoose.model("posts");

  const allPosts = await postsModel
    .find({
      author: req.user._id, // Returns all post in posts model whose author Id matches the id of loogged in user.
    })
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    data: allPosts,
  });
};

module.exports = allPosts;
