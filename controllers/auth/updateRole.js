const mongoose = require('mongoose');
const User = require("../../models/User.model");

const updateUserRole = async (req, res, next) => {
  const { email, role } = req.body;
console.log(req.body.email)
  // Check if email and role are provided
  if (!email || !role) {
    return res.status(400).json({ error: 'Email and role are required' });
  }

  // Find user by email and check if verified
  const user = await User.findOne({ email, isVerified: true });
  if (!user) {
    return res.status(404).json({ error: 'User not found or not verified' });
  }

  // Update user role
  user.role = role;
  await user.save();

  res.json({ message: 'User role updated successfully' });
};

module.exports = updateUserRole;