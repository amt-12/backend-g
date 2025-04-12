const User = require("../../models/User.model");
const { registrationValidation } = require("../../services/validation_schema");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    const { username, password } = registerValues;

    const userInfo={
      username,
      password
    }
const secretKey = process.env.ACCESS_TOKEN_SECRET
    const jwtToken = jwt.sign(userInfo,secretKey);
    const newUser = new User({
      username,
      password,
      jwtToken
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
