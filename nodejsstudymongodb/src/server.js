const express = require("express");
const app = express();
const cors = require("cors");
const { useRouter, blogRouter } = require("./routes");
const { commentRouter } = require("./routes/commentRouter");
const mongoose = require("mongoose");
const { generateFakeData } = require("../faker.js");
const MONGO_URI =
  "mongodb+srv://kimseounghun:tkgl5012qq21@mongodbstudy.rgulq2j.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    mongoose.set("debug", true);
    console.log("mongodb conneted!");
    // await generateFakeData(100, 10, 300);
    //키지 말자
    //미들웨어
    app.use(express.json());
    app.use(cors());

    app.use("/user", useRouter);
    app.use("/blog", blogRouter);
    app.use("/blog/:blogId/comment", commentRouter);

    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
