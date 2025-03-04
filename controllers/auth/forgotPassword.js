const nodemailer = require('nodemailer');
const User = require("../../models/User.model");
const ResetPassword = require("../../models/ResetPassword.model");

const generateOTP = () => {
  // Generate a 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a new OTP
    const otp = generateOTP();

    // Create a new reset password document
    const resetPassword = new ResetPassword({ email, otp });
    await resetPassword.save();

    // Send OTP via email
    let config = {
      service: "gmail",
      auth: {
        user: "amrit0207232@gmail.com",
        pass: "qxozxptvbhkddbyc",
      },
    };
    let transporter = nodemailer.createTransport(config);
    let message = {
      from: "amrit0207232@gmail.com",
      to: email, // Send to the user's email instead of a fixed email
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is: ${otp}</b>`,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          msg: "OTP sent to your email successfully!",
          email: email, // include the user's email in the response
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });

  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = forgotPassword;