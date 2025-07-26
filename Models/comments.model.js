const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const commentsModel = mongoose.model("comments", commentsSchema);
