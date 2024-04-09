const mongoose = require('mongoose');

const Schema = mongoose.Schema;


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


const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
