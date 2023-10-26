const User = require("../models/userModels");
const Post = require("../models/postModel");
const { uploadImage, deleteImage } = require("../middleweres/uploadImg");

/// create a new post
exports.createPost = async (req, res) => {
  const { caption, uploadImg } = req.body;
  try {
    // Upload the image
    if (uploadImg) {
      const imageUrl = await uploadImage(uploadImg);
      const image = {
        url: imageUrl.url,
        public_id: imageUrl.public_id,
      };
      const newPostData = {
        caption: caption ? caption : null,
        owner: req.user._id,
        image,
      };

      const post = await Post.create(newPostData);
      const user = await User.findById(req.user._id);

      user.posts.push(post._id);
      await user.save();
    } else {
      const post = await Post.create({ caption, owner: req.user._id });
      const user = await User.findById(req.user._id);
      user.posts.push(post._id);
      await user.save();
    }

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

/// edit caption
exports.updateCaptionPost = async (req, res) => {
  const { postId, caption } = req.body;
  try {
    const post = await Post.findById(postId);
    post.caption = caption;
    await post.save();

    res.status(201).json({
      success: true,
      message: "Caption is updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get my posts
exports.myposts = async (req, res) => {
  const { userId } = req.body;
  try {
    const posts = await Post.find({
      owner: userId,
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
    if (post.image.url) {
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
// report the spacific user
exports.reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!post.reports.includes(req.user._id)) {
      post.reports.push(req.user._id);
    }
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post reported successfully",
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

    post.comments.push({ user: req.user._id, comment, commentAt: Date.now() });

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
// delete this spacific comment
exports.deleteCommentPost = async (req, res) => {
  const { commentId } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (!commentId) {
      return res
        .status(200)
        .json({ success: false, message: "please enter a comment" });
    }

    post.comments.forEach((element, i) => {
      if (element._id.toString() === commentId) {
        post.comments.splice(i, 1);
      }
    });
    await post.save();

    res.status(200).json({
      success: true,
      message: "delete comment",
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
    const post = await Post.findById(req.params.id).populate(
      "comments.user comments.replies.user comments.replies.replyTo"
    );

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
// react a spacific comment

exports.reactCommentPost = async (req, res) => {
  const { commentId } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "No such post", success: false });
    }

    for (let index = 0; index < post.comments.length; index++) {
      if (post.comments[index]._id.toString() === commentId) {
        // get the desire comment
        if (post.comments[index].likes.includes(req.user._id)) {
          const i = post.comments[index].likes.indexOf(req.user._id);
          post.comments[index].likes.splice(i, 1);
        } else {
          post.comments[index].likes.push(req.user._id);
        }
      }
    }
    await post.save();
    res.status(200).json({
      success: true,
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
  const { comment, commentId, replyToId } = req.body;
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
    const replyTo = await User.findById(replyToId);

    post.comments[index].replies.push({
      user: req.user._id,
      comment,
      replyAt: Date.now(),
      replyTo,
    });

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
// reply a specific comment

exports.replyReactComment = async (req, res) => {
  const { commentId, replyCommentId } = req.body;
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

    const replyIndex = post.comments[index].replies.findIndex(
      (reply) => reply._id.toString() === replyCommentId
    );
    if (post.comments[index].replies[replyIndex].likes.includes(req.user._id)) {
      const i = post.comments[index].replies[replyIndex].likes.indexOf(
        req.user._id
      );

      post.comments[index].replies[replyIndex].likes.splice(i, 1);
    } else {
      post.comments[index].replies[replyIndex].likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "reply react successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// reply a specific comment

exports.replyOfReplyComment = async (req, res) => {
  const { commentId, replyCommentId, comment, replyTo } = req.body;
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

    const replyIndex = post.comments[index].replies.findIndex(
      (reply) => reply._id.toString() === replyCommentId
    );
    const newObject = {
      user: req.user._id,
      comment,
      replyAt: Date.now(),
      replyTo,
    };
    post.comments[index].replies.splice(replyIndex + 1, 0, newObject);

    await post.save();

    res.status(200).json({
      success: true,
      message: "repllied to a specified comment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// reply a specific comment

exports.deleteRepliedComment = async (req, res) => {
  const { commentId, replyId } = req.body;
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

    const replyIndex = post.comments[index].replies.findIndex(
      (reply) => reply._id.toString() === replyId
    );

    post.comments[index].replies.splice(replyIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      message: "replied Comment deleted successfully",
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

/// upload a video url on database
exports.uploadVideo = async (req, res) => {
  const { videoUrl, publicId, caption } = req.body;

  try {
    // Upload the image

    const video = {
      url: videoUrl,
      public_id: publicId,
    };

    const newPostData = {
      caption,
      owner: req.user._id,
      video,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "video uploaded",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
