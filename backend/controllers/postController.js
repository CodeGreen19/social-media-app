const User = require("../models/userModels");
const Post = require("../models/postModel");
const { uploadImage, deleteImage } = require("../middleweres/uploadImg");

/// create a new post
exports.createPost = async (req, res) => {
  const { caption, uploadImg } = req.body;
  try {
    // Upload the image

    const imageUrl = await uploadImage(uploadImg);
    const image = {
      url: imageUrl.url,
      public_id: imageUrl.public_id,
    };

    const newPostData = {
      caption,
      owner: req.user._id,
      image,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.myposts = async (req, res) => {
  try {
    const posts = await Post.find({
      owner: req.user._id,
    })
      .populate("owner")
      .exec();

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/// delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    if (post.image) {
      await deleteImage(post.image.public_id);
    }

    await Post.deleteOne({ _id: post._id });

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// like and dislike post
exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// following posts
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// create a new comment
exports.commentPost = async (req, res) => {
  const { comment } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (!comment) {
      return res
        .status(200)
        .json({ success: false, message: "please enter a comment" });
    }

    post.comments.push({ user: req.user._id, comment });

    await post.save();

    res.status(200).json({
      success: true,
      message: "comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all comment of a specific  post

exports.allCommentsPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments.user");

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reply a specific comment

exports.replyComment = async (req, res) => {
  const { comment, commentId } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (!comment) {
      return res
        .status(200)
        .json({ success: false, message: "please enter a comment" });
    }

    const index = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    post.comments[index].replies.push({ user: req.user._id, comment });

    await post.save();

    res.status(200).json({
      success: true,
      message: "reply successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all the replies comment of the spacific comment
exports.getRepliedComments = async (req, res) => {
  const { commentId } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const index = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // to populate the user
    const expandComments = await post.populate(
      `comments.${[index]}.replies.user`
    );
    const replies = expandComments.comments[index].replies;

    res.status(200).json({
      success: true,
      replies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
