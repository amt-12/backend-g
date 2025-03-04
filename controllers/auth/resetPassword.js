const ResetPassword = require("../../models/ResetPassword.model");
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;

    let buff = Buffer.from(token, "base64");
    let text = buff.toString("ascii");
    const { email, password } = req.body;
    console.log(email);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    await ResetPassword.findOneAndDelete({ email: email });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = resetPassword;
