const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    isVerified: { type: Boolean, default: false },
    createDate : {
      type: Date,
      default: Date.now,
      select: false
    },
    rentals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rental"
      }
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    comments : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  })

  
);


module.exports = User;