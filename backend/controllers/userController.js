const User = require("../models/userModels");
const { uploadImage, deleteImage } = require("../middleweres/uploadImg");
const { sendError } = require("../utils/sendError");
const { sendEmail } = require("../middleweres/sendMail");
const crypto = require("crypto");
// register user
exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, selectedImage } = req.body;

  // before authentication to register a new user
  if (!name || !email || !password || !confirmPassword)
    return sendError(res, 400, "please fill all the fields!");
  if (password !== confirmPassword)
    return sendError(res, 400, "password and confirm password do not match!");
  if (password.length < 6)
    return sendError(res, 400, "password must be at least 6 characters");
  if (!selectedImage)
    return sendError(res, 400, "please select a profile image");

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return sendError(res, 400, "you can't use this email address");
    }

    // Upload the image
    const imageUrl = await uploadImage(selectedImage);

    const avatar = {
      url: imageUrl.url,
      public_id: imageUrl.public_id,
    };

    const option = {
      name,
      email,
      password,
      avatar,
      joinedOn: Date.now(),
    };
    const user = await User.create(option);

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      message: "user created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, "email and password are required !");
  }

  try {
    // find existing user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendError(res, 404, "signup to ba a authenticated user");
    }
    const passwordCompare = await user.passwordCompare(password);
    if (!passwordCompare) {
      return sendError(res, 404, "email and password does not match");
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      message: "login successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// load user user
exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout user
exports.LogoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update profle
exports.updateProfile = async (req, res) => {
  const { name, email, password, newPassword, confirmPassword, profileImg } =
    req.body;

  try {
    // get user
    const user = await User.findById(req.user._id).select("+password");

    // before authenticate
    if (
      name === user.name &&
      email === user.email &&
      profileImg === user.avatar.url &&
      password === "" &&
      newPassword === "" &&
      confirmPassword === ""
    ) {
      return sendError(res, 400, "change any field to update");
    }
    if (newPassword !== confirmPassword) {
      return sendError(res, 400, "password and confirm password must match!");
    }

    //chect if the user change the profie image.
    // if change the image it will remove the old image and by the new image

    if (profileImg !== user.avatar.url) {
      await deleteImage(user.avatar.public_id);
      const imageUrl = await uploadImage(profileImg);
      const avatar = {
        url: imageUrl.url,
        public_id: imageUrl.public_id,
      };
      user.avatar = avatar;
    }

    // if change name so make change by new name
    if (name) {
      user.name = name;
    }
    // if change email so make change by new email
    if (email && email !== user.email) {
      const isNewEmailExist = await User.findOne({ email });
      if (isNewEmailExist) {
        return res
          .status(400)
          .json({ success: false, message: "You can not use this email" });
      }

      user.email = email;
    }

    //   // update password
    if (password) {
      const passwordCompare = await user.passwordCompare(password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, message: "old Password Does Not Match" });
      }
      user.password = newPassword;
    }

    // save all the changes
    await user.save();
    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 400, "user not found");
  }
  const resetPasswordToken = user.getResetPasswordToken();

  await user.save();

  const resetUrl = `http://localhost:3000/reset/password/${resetPasswordToken}`;

  const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  try {
    if (!newPassword) return sendError(res, 400, "give password before update");
    if (newPassword !== confirmPassword) {
      return sendError(res, 400, "password and confirm password do not match");
    }
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.newPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
