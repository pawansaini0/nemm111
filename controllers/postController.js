const { Post } = require("../modules/postModel");
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  try {
    let { title, body, device } = req.body;
    const obj = {
      title,
      body,
      device,
      author: req.userId,
    };
    const post = await Post.create(obj);
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { device, page } = req.query;
    let skip;
    if (page) {
      skip = (page - 1) * 3;
    } else {
      skip = 0;
    }

    let query = { author: req.userId };
    if (device) {
      query.device = device;
    }

    const postdata = await Post.find(query).skip(skip).limit(3);
    res.status(200).json(postdata);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.send("post not found");
    }
    if (post.author.toString() !== req.userId) {
      res.send("Not authorized");
    }

    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatePost);
  } catch (error) {
    res.status(500).json({ msg: "Update-Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.send("post not found");
    }
    if (post.author.toString() !== req.userId) {
      res.send("Not authorized");
    }

    const deletePost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(deletePost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
