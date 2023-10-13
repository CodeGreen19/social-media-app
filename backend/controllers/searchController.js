const User = require("../models/userModels");

/// search all users
exports.searchUser = async (req, res) => {
  try {
    const allUsers = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    const users = allUsers.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
