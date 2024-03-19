const Like = require('../models/likeModel');

// Get all likes
const getLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.status(200).json(likes);
  } catch (error) {
    console.error('Error retrieving likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Get number of likes by post_id
const getLikesByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    const likeCount = await Like.countDocuments({ post_id });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error('Error retrieving like count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Check if the post is liked by the current user
const checkPostLike = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { _id } = req.user;
    
    const existingLike = await Like.findOne({ post_id, user_id: _id });

    if (existingLike) {
      res.status(200).json({ liked: true });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    console.error('Error checking post like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new like
const createLike = async (req, res) => {
    const { post_id } = req.params;
    const { _id } = req.user;

  try {
    
    const newLike = await Like.create({ user_id: _id, post_id });
    res
      .status(201)
      .json({ message: 'Like created successfully', like: newLike });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

// Delete a like
const deleteLike = async (req, res) => {
    const { post_id } = req.params;
    const { _id } = req.user;

  try {
    const deletedLike = await Like.findOneAndDelete({ user_id: _id, post_id });
    if (!deletedLike) {
      return res.status(404).json({ message: 'Like not found', post_id: post_id, user_id: _id });
    }
    res
      .status(200)
      .json({ message: 'Like deleted successfully', like: deletedLike });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getLikes,
  getLikesByPostId,
  checkPostLike,
  createLike,
  deleteLike,
};
