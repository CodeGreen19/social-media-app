const User = require("../models/userModels");
const Post = require("../models/postModel");
const shuffleArray = require("../middleweres/suffle");

// to follow and unfollow
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
    const user = await User.findById({ _id: req.body.selectId })
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

// to show  suggested follow
exports.suggestedFollow = async (req, res) => {
  try {
    const allUsers = await User.find();
    const user = await User.findById({ _id: req.body.selectId });
    const followingIds = user.following;
    let userIds = [];
    for (let index = 0; index < allUsers.length; index++) {
      userIds.push(allUsers[index].id);
    }
    // to filter unfollowing users
    let unfollowingUsersId = userIds.filter(
      (userId) => !followingIds.includes(userId)
    );
    let index = unfollowingUsersId.indexOf(req.user._id.toString());
    unfollowingUsersId.splice(index, 1);
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
// to remove my followers
exports.removeFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.followers.includes(req.params.id)) {
      const followerIndex = user.followers.indexOf(req.params.id);
      user.followers.splice(followerIndex, 1);
      await user.save();

      const toRemove = await User.findById(req.params.id);
      const index = toRemove.following.indexOf(req.user._id);
      toRemove.following.splice(index, 1);
      await toRemove.save();
    } else {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this",
      });
    }
    res.status(201).json({
      success: true,
      message: "removed follower",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get posts of followers
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner comments.user");
    shuffleArray(posts);

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
