const express = require("express");
const {
  registerUser,
  loginUser,
  LogoutUser,
  loadUser,
  updateProfile,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleweres/userAuth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, LogoutUser);
router.route("/me").get(isAuthenticated, loadUser);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.route("/forget/password").put(forgetPassword);
router.route("/reset/password/:token").put(resetPassword);

module.exports = router;
