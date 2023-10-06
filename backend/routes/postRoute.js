const express = require("express");
const {
  createPost,
  deletePost,
  likeAndUnlikePost,
  getPostOfFollowing,
} = require("../controllers/postController");
const { isAuthenticated } = require("../middleweres/userAuth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router
  .route("/post/create/:id")
  .delete(isAuthenticated, deletePost)
  .put(isAuthenticated, likeAndUnlikePost);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);

module.exports = router;
