const createError = require("http-errors");
const ResetPassword = require("../../models/ResetPassword.model");
const sendEmail = require("../../services/sendEmail");

const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../../services/validation_schema");

const register = async (req, res, next) => {
  try {
    const result = await registerValidation.validateAsync(req.body);
    const { name, phone, email, password, confirmPassword, gender } = result;

    const userExistingEmail = await User.findOne({
      email,
    });
    const userExistingPhone = await User.findOne({
      phone,
    });
    if (userExistingPhone ) {
      throw new Error(`${phone} is already exist. Please login.`);
    }

    // if (userExistingEmail ) {
    //   if (userExistingEmail.isVerified === true) {
    //     throw new Error(
    //       `${email} is already exist and verified. Please login.`
    //     );
    //   } else {
    //     throw new Error(
    //       `${email} is already exist but not verified. Please verify your email.`
    //     );
    //   }
    // }
    if (userExistingEmail ) {
      throw new Error(`${email} is already exist. Please login.`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      gender,
    });
    await user.save();

    res.status(200).json({
      message: "Otp Sent successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
