const { Schema } = require("mongoose");
const shortId = require("./types/shortId");
const CommentSchema = require("./comments");

const PostSchema = new Schema(
  {
    shortId,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    comments: {
      type: [CommentSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PostSchema;
