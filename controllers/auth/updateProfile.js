const User = require("../../models/User.model"); 
const UserOtpModel = require("../../models/UserOtp.model");
const { updateValidation } = require("../../services/validation_schema");

const updateProfile = async (req, res, next) => {
  try {
    const { phone, name, email } = req.body;



    // Check if the email already exists in the User model
    const existingUserWithEmail = await User.findOne({ email });
    if (!existingUserWithEmail ) {
      return res.status(400).json({ message: "Email Not exists" });
    }

    // Update the user fields
    existingUserWithEmail.phone = phone;
    existingUserWithEmail.name = name;

    // Save the updated user
    await existingUserWithEmail.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfile;
