const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const postsModel = mongoose.model("posts");

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password");

  const allPost = await postsModel
    .find({
      author: req.user._id,
    })
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    message: "user dashboard display",
    allPost,
  });
};

module.exports = userDashboard;
