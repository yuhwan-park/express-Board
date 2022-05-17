const mongoose = require("mongoose");
const PostSchema = require("./schemas/post");
const UserSchema = require("./schemas/user");

exports.Post = mongoose.model("Post", PostSchema);
exports.User = mongoose.model("User", UserSchema);
