const User = require("../../models/User.model");

const changePhoto = async (req, res, next) => {
  try {
      const userEmail = req.body.email; 
      const newImage = req.body.image; 

      const user = await User.findOne({ email: userEmail });
      if (!user) {
          return res.status(404).json({ message: 'User  not found' });
      }

     user.image = newImage; 
      await user.save();

      return res.status(200).json({ message: 'Image updated successfully', user });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = changePhoto;