const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { Blog } = require("../models/Blog");
const { User } = require("../models/User");
const { Comment } = require("../models/Comment");
const { isValidObjectId } = require("mongoose");

commentRouter.post("/", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content, userId } = req.body;
    if (!isValidObjectId(blogId))
      return res.status(400).send({ err: "blogId is invalid" });
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "userId is invalid" });
    if (typeof content !== "string")
      return res.status(400).send({ err: "content is required" });
    const [blog, user] = await Promise.all([
      Blog.findByIdAndUpdate(blogId),
      User.findByIdAndUpdate(userId),
    ]);
    // const blog = await Blog.findById(blogId);
    // const user = await User.findById(userId);
    if (!blog || !user)
      return res.status(400).send({ err: "blog or user is not exist" });
    if (blog.islive === false)
      return res.status(400).send({ err: "islive is not true" });
    const comment = new Comment({ content, user, blog });
    await comment.save();
    return res.send({ comment });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

commentRouter.get("/", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId))
      return res.status(400).send({ err: "blogId is invalid" });

    const comments = await Comment.find({ blog: blogId });
    return res.send({ comments });
  } catch (err) {
    console.log(err);
  }
});

// commentRouter.get("/", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// });

// commentRouter.put("/", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// });

// commentRouter.delete("/", async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = { commentRouter };
