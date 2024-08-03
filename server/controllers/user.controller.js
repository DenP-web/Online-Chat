const User = require("../models/user.model");

const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // select('-password') meen that don't return key password // we get all users from dataBase without me or logged user

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in getUserForSidebar: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserForSidebar,
};
