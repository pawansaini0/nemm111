const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRegister = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "User already exists, please login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });

    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPresent = await User.find({ email });

    if (!userPresent) {
      res.json("User is not present");
      const check = await bcrypt.compare(password, userPresent[0].password);
      if (!check) {
        res.json("invalid credentials");
      }
      const token = jwt.sign(
        { userId: userPresent[0]._id },
        process.env.secret
      );
      res.json({ email, token });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
