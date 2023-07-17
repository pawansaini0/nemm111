const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const middleware = async (req, res, next) => {
  const token = req.header("Authtoken");
  if (!token) {
    res.status(401).json({ msg: "No token provided" });
  }

  try {
    let decoded = jwt.verify(token, process.env.secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authorization denied,Invalid token." });
  }
};

router.post("/create", middleware, createPost);
router.get("/", middleware, getPost);
router.patch("/update/:id", middleware, updatePost);
router.delete("/delete/:id", middleware, deletePost);

module.exports = router;
