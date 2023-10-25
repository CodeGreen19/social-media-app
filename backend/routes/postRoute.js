const express = require("express");
const {
  createPost,
  deletePost,
  likeAndUnlikePost,
  myposts,
  commentPost,
  allCommentsPost,
  replyComment,
  getRepliedComments,
  uploadVideo,
  reactCommentPost,
  deleteCommentPost,
  replyReactComment,
  replyOfReplyComment,
  deleteRepliedComment,
  updateCaptionPost,
  reportPost,
} = require("../controllers/postController");
const { isAuthenticated } = require("../middleweres/userAuth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router.route("/post/update").post(isAuthenticated, updateCaptionPost);
router.route("/post/like/:id").put(isAuthenticated, likeAndUnlikePost);
router.route("/post/report/:id").put(isAuthenticated, reportPost);
router.route("/post/delete/:id").delete(isAuthenticated, deletePost);
router.route("/post/comment/:id").put(isAuthenticated, commentPost);
router
  .route("/post/comment/delete/:id")
  .put(isAuthenticated, deleteCommentPost);
router.route("/post/replied/:id").put(isAuthenticated, replyOfReplyComment);
router
  .route("/post/reply/delete/:id")
  .put(isAuthenticated, deleteRepliedComment);
router.route("/post/react/comment/:id").put(isAuthenticated, reactCommentPost);
router.route("/post/react/reply/:id").put(isAuthenticated, replyReactComment);
router.route("/post/reply/:id").put(isAuthenticated, replyComment);
router.route("/post/replies/:id").put(isAuthenticated, getRepliedComments);
router.route("/post/allcomment/:id").get(isAuthenticated, allCommentsPost);
router.route("/myposts").post(isAuthenticated, myposts);
router.route("/video/upload").post(isAuthenticated, uploadVideo);

module.exports = router;
