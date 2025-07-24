const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const emailHandler = require("../../Managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, reset_code, new_password, confirm_new_password } = req.body;

  if (!reset_code) throw "Reset code is required";
  if (!new_password) throw "Enter new password";
  if (!confirm_new_password) throw "Enter password confirmation";
  if (!validator.isLength(new_password, { min: 8 }))
    throw "Password must be at least 8 characters long.";
  if (!validator.matches(new_password, /[A-Z]/, "g"))
    throw "Password must have at least one uppercase";
  if (new_password !== confirm_new_password) throw "Passwords do not match";

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code,
  });
  if (!getUserWithResetCode) throw "Invalid reset code";

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      reset_code,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailHandler(
    email,
    "You have successfully reset yoour password",
    "You have successfully reset yoour password",
    "Password Reset"
  );

  res.status(200).json({
    status: "Password reset success",
  });
};

module.exports = resetPassword;
