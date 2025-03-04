const Otp = require("../../models/Otp.model");
const User = require("../../models/User.model"); // Import User model

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const resetotp = await Otp.findOne({
      email,
      otp,
    });

    if (resetotp?.otp === req.body.otp) {
      const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "OTP Verified Successfully, please Login !",
        success: true,
        statusText: "OK",
      });
    } else if (resetotp?.otp !== otp) {
      res.status(500).json({
        message: "Invalid OTP !",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = verifyOtp;