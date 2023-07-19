const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.models");

const userRouter = express.Router();



userRouter.post("/register", async (req, res) => {
  const { name, email, gender, pass, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
      } else {
        const user = await UserModel({
          name,
          email,
          gender,
          age,
          pass: hash,
        });
        await user.save();
        res.status(200).json({ msg: "New user has been registered" });
      }
    });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "buyc");
          res.status(200).json({ msg: "Login Successfull !!", token: token });
        } else {
          res.status(400).json({ err: err.message });
        }
      });
    } else {
      res.status(400).json({ msg: "wrong credentials!!! Try again..." });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});



userRouter.post("/admin", async (req, res) => {
  const { email, pass } = req.body;
  try {
    if (email === "admin@123" && pass === "admin") {
      res.status(200).json({ msg: "Admin logged inn..." });
    } else {
      res.status(400).json({ msg: "wrong credentials!!! Try again..." });
    }
  } catch (error) {
    res.status(400).json({ msg: "wrong credentials!!! Try again..." });
  }
});

module.exports = { userRouter };