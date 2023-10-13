const express = require("express");

const { isAuthenticated } = require("../middleweres/userAuth");
const {
  FollowAndUnfollow,
  myFollowing,
  suggestedFollow,
} = require("../controllers/followControllers");
const router = express.Router();

router.route("/follow/:id").put(isAuthenticated, FollowAndUnfollow);
router.route("/following").get(isAuthenticated, myFollowing);
router.route("/suggested").get(isAuthenticated, suggestedFollow);

module.exports = router;
