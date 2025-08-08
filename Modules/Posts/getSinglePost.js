const mongoose = require("mongoose");
const validator = require("validator");
const redisClient = require("../../config/redis");

const getSinglePost = async (req, res) => {
  const postsModel = mongoose.model("posts");
  const { postId } = req.params;

  if (!postId) throw "Post ID is required";
  if (!validator.isMongoId(postId)) throw "Invalid Post ID";

  try {
    //Step 1: Try to get data post from Redis
    const cacheKey = `post:${postId}`;

    const cachedPost = await redisClient.get(cacheKey);
    if (cachedPost) {
      return res.status(200).json({
        status: "Success from cache",
        singlePost: JSON.parse(cachedPost),
      });
    }

    // Step 2: If not in cache, fetch form DB

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

    // Step 3: Cache the DB result in Redis
    await redisClient.setEx(cacheKey, JSON.stringify(getPost), "EX", 60 * 5);

    res.status(200).json({
      status: "from database",
      singlePost: getPost,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Servor Error",
    });
  }
};

module.exports = getSinglePost;
