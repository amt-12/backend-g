const nodemailer = require('nodemailer');
const User = require("../../models/User.model");
const ResetPassword = require("../../models/ResetPassword.model");
const bcrypt = require('bcrypt'); // Import bcrypt

const newPassword = async (req, res, next) => {
  try {
    // Get the OTP and new password from the request body
    const { otp, newPassword } = req.body;
    console.log(req.body.otp)

    // Verify the OTP
    const otpDoc = await ResetPassword.findOne({ otp });
    console.log(otpDoc)

    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Get the user email from the OTP document
    const userEmail = otpDoc.email;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Find the user by email and update the password
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { password: hashedNewPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = newPassword;