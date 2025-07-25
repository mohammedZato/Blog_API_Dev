const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const emailHandler = require("../../Managers/emailManager");
const jwtHandler = require("../../Managers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { username, email, password, confirm_password } = req.body;

  if (!username) throw "Username is required";
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (!validator.isLength(password, { min: 8 }))
    throw "Password must be at least 8 characters long.";
  if (!validator.matches(password, /[A-Z]/, "g"))
    throw "Password must have at least one uppercase";
  if (password !== confirm_password) throw "Passwords do not match";

  const getUser = await usersModel.findOne({
    email: email,
  });
  if (getUser) throw "Email already exists. Please Login";

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await usersModel.create({
    username,
    email,
    password: hashedPassword,
  });

  await emailHandler(
    email,
    "You have successfully registered to Alpha Blogs. Stay tuned for latest on the site",
    "<h1>You have successfully registered to Alpha Blogs. Stay tuned for latest on the site</h1>",
    "Alpha Blog Website Registration"
  );

  const accessToken = jwtHandler(newUser);

  res.status(200).json({
    status: "success",
    message: "Registration Successful",
    accessToken,
  });
};

module.exports = register;
