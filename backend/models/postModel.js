const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  genre: {
      type: String,
      required: true
  },
  link: {
      type: String,
      required: true
  },
  desc: {
      type: String,
      required: true
  },
  user_id: {
    type: String,
    required: true
}

}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)