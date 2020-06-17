const mongoose = require('mongoose');

const Booking = mongoose.model(
    "Booking",
    new mongoose.Schema({
        startAt: {
            type: Date,
            required: true
        },
        endAt: {
            type: Date,
            required: true
        },
        totalPrice: {
            type: Number
        },
        days: {
            type: Number
        },
        guests: {
            type: Number,
            required: true
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        rental: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rental"
        }
    })
);

module.exports = Booking;