const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtHandler = require("../../Managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { username, email, password } = req.body;

  if (!username) throw "Username is required";
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";

  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "Email does not exist. Please register";

  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Passwords do not match. Try Again!";

  const accessToken = jwtHandler(getUser);

  res.status(200).json({
    status: "log in success",
    data: getUser,
    accessToken,
  });
};

module.exports = login;
