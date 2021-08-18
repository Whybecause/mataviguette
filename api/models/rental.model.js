const mongoose = require('mongoose');

const Rental = mongoose.model(
    "Rental",
    new mongoose.Schema({
        title: { type: String},
        city: { type: String},
        street: { type: String},
        category: { type: String},
        bedrooms: { type: Number},
        shared: { type: Boolean},
        dailyRate: { type: Number},
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        bookings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Booking"
            }
        ]
    })
);



module.exports = Rental;