const mongoose = require("mongoose");

const addPost = async (req, res) => {
  const postsModel = mongoose.model("posts");
  const { title, body, image } = req.body;

  if (!title) throw "Title is required";
  if (!body) throw "Body is required";

  const newPost = await postsModel.create({
    author: req.user._id,
    title,
    body,
  });

  res.status(200).json({
    status: "Post Added successfully",
    newPost,
  });
};

module.exports = addPost;
