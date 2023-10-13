const User = require("../models/userModels");

exports.FollowAndUnfollow = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const toFollow = await User.findById({ _id: id });
    const makeFollowing = await User.findById({ _id });
    if (!toFollow) {
      return res
        .status(400)
        .json({ success: false, message: "not found to follow user" });
    }
    if (toFollow.followers.includes(_id)) {
      const index = toFollow.followers.indexOf(_id);
      toFollow.followers.splice(index, 1);
      await toFollow.save();

      const i = makeFollowing.following.indexOf(id);
      makeFollowing.following.splice(i, 1);
      await makeFollowing.save();
      res.status(201).json({
        success: true,
        message: "user Unfollowed",
      });
    } else {
      toFollow.followers.push(_id);
      makeFollowing.following.push(id);
      await toFollow.save();
      await makeFollowing.save();
      res.status(201).json({
        success: true,
        message: "user followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// my followers
exports.myFollowing = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })
      .populate("following followers")
      .exec();
    const following = user.following;
    const followers = user.followers;
    res.status(201).json({
      success: true,
      followers,
      following,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// my followers
exports.suggestedFollow = async (req, res) => {
  try {
    const allUsers = await User.find();
    const user = await User.findById({ _id: req.user._id });
    const followingIds = user.following;
    let userIds = [];
    for (let index = 0; index < allUsers.length; index++) {
      userIds.push(allUsers[index].id);
    }
    // to filter unfollowing users
    const unfollowingUsersId = userIds.filter(
      (userId) => !followingIds.includes(userId)
    );

    const unfollowingUsers = await User.find({
      _id: { $in: unfollowingUsersId },
    });
    res.status(201).json({
      success: true,
      unfollowingUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
