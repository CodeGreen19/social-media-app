const User = require("../models/userModels");

///to search all users
exports.searchUser = async (req, res) => {
  try {
    const mainUser = await User.findById(req.user._id);
    const allUsers = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    const filteredusers = allUsers.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );

    const followUsers = filteredusers.filter((user) => {
      return !mainUser.following.some(
        (element) => element.toString() === user._id.toString()
      );
    });
    const followimgUsers = filteredusers.filter((user) => {
      return mainUser.following.some(
        (element) => element.toString() === user._id.toString()
      );
    });
    res.status(201).json({
      success: true,
      followimgUsers,
      followUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
