const { Schema, model, Types } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    islive: { type: Boolean, require: true, default: false }, // islive = false 임시저장 상태
    user: { type: Types.ObjectId, require: true, ref: "user" }, // user.js 에서 만든 user 콜랙션을 보고 몽구스가 참고함
  },
  { timestamps: true }
);

const Blog = model("blog", BlogSchema);

module.exports = { Blog };
