const { Router } = require("express");
const mongoose = require("mongoose");
const useRouter = Router();
const { User } = require("../models/User");

useRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (error) {
    console.log(error);
  }
});

useRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({
        err: "unvalid userId",
      });
    }
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

useRouter.post("/", async (req, res) => {
  try {
    let { username, name } = req.body;
    if (!username) {
      return res.status(400).send({
        error: "user name is required",
      });
    }
    if (!name || !name.first || !name.last) {
      return res.status(400).send({
        error: "Both first and last names are required",
      });
    }
    const user = new User(req.body); //몽구스롤 인스터스를 만듦
    await user.save(); //성공적으로 저장이 되면
    return res.send({ user }); // 성공을 리턴해줌
    // return res.send({success: true}) // 성공을 리턴해줌
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

useRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({
        err: "unvalid userId",
      });
    }
    const user = await User.findByIdAndDelete({ _id: userId });
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

useRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({
        err: "unvaild userID",
      });
    }
    const { age, name } = req.body;
    if (!age && !name) {
      return res.status(400).send({
        err: "age or name is required",
      });
    }
    if (!age)
      return res.status(400).send({
        err: "age is required",
      });
    if (typeof age !== "number") {
      return res.status(400).send({
        err: "age must be a number",
      });
    }
    if (
      name &&
      typeof name.first !== "string" &&
      typeof name.last !== "string"
    ) {
      return res.status(400).send({
        err: "first, last names are must be String",
      });
    }
    // let updateBody = {};
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;
    // const user = await User.findByIdAndUpdate(userId, updateBody, {
    //   new: true,
    // });

    let user = await User.findById(userId);
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save();

    return res.send({ user });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = {
  useRouter,
};
