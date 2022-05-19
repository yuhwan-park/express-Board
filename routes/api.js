const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const { Post, User } = require("../models");

const router = Router();

router.get(
  "/posts/:shortId/comments",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const post = await Post.findOne({ shortId });
    await User.populate(post.comments, { path: "author" });
    res.json(post.comments);
  })
);

router.post(
  "/posts/:shortId/comments",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { content } = req.body;
    const author = await User.findOne({ shortId: req.user.shortId });

    await Post.updateOne(
      { shortId },
      { $push: { comments: { content, author } } }
    );
    res.json({ result: "success" });
  })
);

module.exports = router;
