const Post = require('../models/postModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Function to get user name by user ID
const getUserName = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.name;
  } catch (error) {
    console.error("Error retrieving user name:", error);
    return null;
  }
};

// get all workouts
const getPosts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    // Map over each post to get the corresponding user's name
    const postsWithUserNames = await Promise.all(posts.map(async (post) => {
      const userName = await getUserName(post.user_id);
      return { ...post.toObject(), userName };
    }));

    res.status(200).json(postsWithUserNames);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get a single workout
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such post' });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: 'No such post' });
  }

  // Get user name by user ID
  const userName = await getUserName(post.user_id);

  // Include user name in the response
  const postWithUserName = { ...post.toObject(), userName };
  res.status(200).json(postWithUserName);
};

// create new workout
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
    const post = await Post.create({
      title,
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

// delete a workout
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

// update a workout
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
  getPost,
  createPost,
  deletePost,
  updatePost,
};
