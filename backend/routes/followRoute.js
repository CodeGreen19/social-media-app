const express = require("express");

const { isAuthenticated } = require("../middleweres/userAuth");
const {
  FollowAndUnfollow,
  myFollowing,
  suggestedFollow,
  removeFollowers,
  getPostOfFollowing,
} = require("../controllers/followControllers");
const router = express.Router();

router.route("/follow/:id").put(isAuthenticated, FollowAndUnfollow);
router.route("/follower/:id").put(isAuthenticated, removeFollowers);
router.route("/following").post(isAuthenticated, myFollowing);
router.route("/suggested").post(isAuthenticated, suggestedFollow);
router.route("/getposts").get(isAuthenticated, getPostOfFollowing);

module.exports = router;
