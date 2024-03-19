const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the like model
const likeSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  post_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the like model
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
