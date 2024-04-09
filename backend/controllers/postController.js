const Post = require('../models/postModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');



// get all posts
const getPosts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPostsByUserId = async (req, res) => {
  const user_id = req.params.user_id; // Assuming user_id is in req.body

  try {
    const posts = await Post.find({ user_id }).sort({ createdAt: -1 });

    

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get a single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: 'No such post' });
  }

  
  res.status(200).json(post);
};

// create new post
const createPost = async (req, res) => {
  const { title, genre, link, desc } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!genre) {
    emptyFields.push('genre');
  }
  if (!link) {
    emptyFields.push('link');
  }
  if (!desc) {
    emptyFields.push('desc');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const name = req.user.name
    const post = await Post.create({
      title,
      name,
      genre,
      link,
      desc,
      user_id,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: 'No such post' });
  }

  res.status(200).json(post);
};

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(400).json({ error: 'No such post' });
  }

  res.status(200).json(post);
};

module.exports = {
  getPosts,
  getPostsByUserId,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
