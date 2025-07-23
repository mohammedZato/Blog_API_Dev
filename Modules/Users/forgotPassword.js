const mongoose = require("mongoose");
const emailHandler = require("../../Managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email } = req.body;

  if (!email) throw "Please provide email";

  const getUserWithEmail = await usersModel.findOne({
    email: email,
  });
  if (!getUserWithEmail) throw "Email does not exist or Not Found";

  const reset_code = Math.floor(1000 + Math.random() * 9000);

  await emailHandler(
    email,
    "This is your reset code " + reset_code,
    "This is your reset code " + reset_code,
    "Password Reset"
  );

  await usersModel.updateOne(
    {
      email,
    },
    {
      reset_code,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Reset code sent successfully",
  });
};
module.exports = forgotPassword;
