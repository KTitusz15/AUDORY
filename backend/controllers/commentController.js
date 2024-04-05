const Comment = require('../models/commentModel');
const mongoose = require('mongoose');

const getCommentsById = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const comments = await Comment.find({ post_id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// create new comment
const createComment = async (req, res) => {
  const { post_id } = req.params;
  const { comment, name } = req.body;

  let comment_text_string = String(comment);
  
  let text = comment.comments
  
  // add doc to db
  try {
    const user_id = req.user._id;
    
    const comment = await Comment.create({
      user_id,
      name,
      post_id,
      text
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such comment' });
  }

  const comment = await Comment.findOneAndDelete({ _id: id });

  if (!comment) {
    return res.status(400).json({ error: 'No such comment' });
  }

  res.status(200).json(comment);
};

// update a comment
const editComment = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such comment' });
    }
  
    const comment = await Comment.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {new: true}
    );
  
    if (!comment) {
      return res.status(400).json({ error: 'No such comment' });
    }
  
    res.status(200).json(comment);
  };

module.exports = {
  getCommentsById,
  createComment,
  deleteComment,
  editComment,
};
