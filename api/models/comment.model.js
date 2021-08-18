const mongoose = require('mongoose');

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type : String },
    booking: 
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Booking"
      }
  }, { timestamps: true })
);

module.exports = Comment;



