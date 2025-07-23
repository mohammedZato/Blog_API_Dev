const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    reset_code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
