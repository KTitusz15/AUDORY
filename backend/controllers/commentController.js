const Comment = require('../models/commentModel');

const getCommentsById = async (req, res) => {
  const { post_id } = req.params;
  Comment.find({ post_id: post_id }, (err, entries) => {
    if (err) {
      // Handle error
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Handle the case when no entries are found
    if (!entries || entries.length === 0) {
      return res
        .status(404)
        .json({ message: 'No entries found with the specified post_id' });
    }

    // Respond with the found entries
    res.status(200).json(entries);
  });
};

// create new comment
const createComment = async (req, res) => {
  const { post_id } = req.params;
  const { comment_text } = req.body;

  let emptyFields = [];

  if (!comment_text) {
    emptyFields.push('title');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }
  if (comment_text.length < 30){
    return res
      .status(400)
      .json({ error: 'Comment should be at least 30 characters long', comment_text });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const comment = await Comment.create({
      user_id,
      post_id,
      comment_text
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
      }
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
