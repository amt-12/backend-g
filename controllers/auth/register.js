const User = require("../../models/User.model");
const { registrationValidation } = require("../../services/validation_schema");
const register = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    const { username, password } = registerValues;

    const userVerification = await User.findOne({
      username,
    });
    const userPassword = await User.findOne({
      password,
    });
    console.log(userVerification);
    if (userVerification) {
      return res.status(200).json({
        success: false,
        message: "User Exist already",
      });
    }
    if (userPassword) {
      return res.status(409).json({
        success: false,
        message: "User Password exists",
      });
    }
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: registerValues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
