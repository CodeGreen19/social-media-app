const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: String,

  image: {
    public_id: String,
    url: String,
  },
  video: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      commentAt: { type: Date },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
            required: true,
          },
          replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          replyAt: { type: Date },
          likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
