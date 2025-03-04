const createError = require("http-errors");
const ResetPassword = require("../../models/ResetPassword.model");
const sendEmail = require("../../services/sendEmail");

const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { OtpValidation } = require("../../services/validation_schema");
const UserOtpModel = require("../../models/UserOtp.model");

const registerOtp = async (req, res, next) => {
  try {
    const result = await OtpValidation.validateAsync(req.body);
    const { email } = result;
    const user = await User.findOne({ email });
    if (user) {
      throw createError.BadRequest("This email is not registered");
    }


    res.status(200).json({
      message: "OTP Sent successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerOtp;
