const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// import models and helpers
const Token = require("../../models/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/generate_token");
const User = require("../../models/User.model");
const Cart = require("../../models/Cart.model");
const ProspectUser = require("../../models/ProspectUser.model");
const { loginAdminValidation } = require("../../services/validation_schema");
const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;

const adminLogin = async (req, res, next) => {
  try {
    const result = await loginAdminValidation.validateAsync(req.body);
    const { email, password } = result;

    const userLogin = await ProspectUser.findOne({ email: email });

    if (!userLogin) {
      throw createError(403, "Account not found,");
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      throw createError.Unauthorized("Incorrect password. Please try again.");
    }
    const payload = {
      email: userLogin.email,
      firstName: userLogin.firstName,
      _id: userLogin._id,
      lastName: userLogin.lastName,
      role: userLogin.role,
      phone: userLogin.phone,
      email: userLogin.email,
      companyName: userLogin.companyName,
      resaleCertificate: userLogin.resaleCertificate,
      einCertificate: userLogin.einCertificate,
      address: userLogin.address,
      primaryAddress: userLogin.primaryAddress,
      isVerified: userLogin.isVerified,
    };

    const accessToken = generateAccessToken(payload, accessTokenLife);
    const refreshToken = generateRefreshToken(payload, refreshTokenLife);
    if (accessToken && refreshToken) {
      const token = new Token({
        user: userLogin._id,
        token: refreshToken,
      });
      await token.save();

      res.cookie("auth", refreshToken, { httpOnly: true });

      res.status(200).json({
        success: true,
        accessToken,
        user: payload,
      });
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = adminLogin;
