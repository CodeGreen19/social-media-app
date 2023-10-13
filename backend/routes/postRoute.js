const express = require("express");
const {
  createPost,
  deletePost,
  likeAndUnlikePost,
  getPostOfFollowing,
  myposts,
  commentPost,
  allCommentsPost,
  replyComment,
  getRepliedComments,
} = require("../controllers/postController");
const { isAuthenticated } = require("../middleweres/userAuth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router.route("/post/like/:id").put(isAuthenticated, likeAndUnlikePost);
router.route("/post/delete/:id").delete(isAuthenticated, deletePost);
router.route("/post/comment/:id").put(isAuthenticated, commentPost);
router.route("/post/reply/:id").put(isAuthenticated, replyComment);
router.route("/post/replies/:id").put(isAuthenticated, getRepliedComments);
router.route("/post/allcomment/:id").get(isAuthenticated, allCommentsPost);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router.route("/myposts").get(isAuthenticated, myposts);

module.exports = router;
