const mongoose = require('mongoose');

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type : String },
  }, { timestamps: true })
);

module.exports = Comment;



