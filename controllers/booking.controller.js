const db = require('../models');
const User = db.user;
const Booking = db.booking;
const Rental = db.rental;
const {
  normalizeErrors
} = require("../helpers/mongoose");
const moment = require('moment');
const Validator = require('validator');
const isEmpty = require('is-empty');
const daysController = require('./days.controller');
const googleFunc = require('../middlewares/googleCalendarValidator');
const sendEmail = require('../middlewares/automaticEmail');

exports.createBooking = async (req, res) => {
  const {
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  } = req.body;

  const user = req.userId;
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  });

  if (Validator.isEmpty(req.body.startAt)) {
    return res.status(400).send({
      message: "You must select a starting date !"
    });
  }

  if (Validator.isEmpty(req.body.endAt)) {
    // return res.status(400).send ({ message: "You must select an ending date !"});
    message.endAt = "You must select ending date";
  }

  if (Validator.isEmpty(req.body.guests)) {
    return res.status(400).send({
      message: "You must select the number of guests!"
    });
  }


function getUserEmail(user, callback) {
  User.findById(user, function(err, foundUser) {
    if (err) return console.log(err);
    const userEmail = foundUser.email;
    return callback(userEmail);
  })
}
function getUserName(user, callback) {
  User.findById(user, function(err, foundUser) {
    if (err) return console.log(err);
    const userName = foundUser.username;
    return callback(userName);
  })
}

  Rental.findOne({
      title: 'Mataviguette'
    })
    .populate("bookings")
    .populate("user")
    .exec( async (err, foundRental) => {
        try {
          if (err) {
            return res.status(422).send({
              errors: normalizeErrors(err.errors)
            });
          }
  
          if (foundRental.user.id === user) {
            return res.status(422).send({
              message: "Invalid User! Cannot create booking on your own rental!"
            });
          }
          booking.days = daysController.getRangeOfDates(startAt, endAt).length - 1;
          if (booking.days === 0) {
            return res.status(422).send({ message: 'Booking must be at least for 1 day'});
          }
          const totalDays = daysController.getRangeOfDates(startAt, endAt).length - 1;
          const totalPrice = foundRental.dailyRate * totalDays;
  
           const googleResponse = await googleFunc.googleAuthAndCheckDates(booking, function(response) {
            if (response === true && isValidBooking(booking, foundRental)) {
              console.log("Event created in DB")
              // getUserEmail(user, function(email) {
              //   getUserName(user, function(username) {
              //   sendEmail(email, username, booking, foundRental);
              //   })
              // })
              return pushBookingToDb(booking, foundRental, user, startAt, endAt, res);
            }
            return res.status(422).json({message: "Invalid Booking ! These dates are not available ! "});
        })
        }
        catch(e) {
            console.log("Error in Booking Creation");
            res.status(422).json({ message: "Error in booking creation"});

        }
    });
};



exports.getUserBookings = (req, res) => {
  const user = req.userId;

  Booking.where({
      user
    })
    .populate("rental")
    .exec((err, foundBookings) => {
      if (err) {
        return res.status(422).send({
          message: err
        });
      }
      if (foundBookings.length === 0) {
        return res.status(404).send({
          message: "You don't have any bookings yet"
        });
      } else {
        return res.json(foundBookings);
      }
    });
};

exports.getAllBookings = (req, res) => {
  Booking.find()
  .populate('user')
  .populate('rental')
  .exec(function(err, bookings) {
    if (err) return handleError(err);
    res.send(bookings);
  })
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(booking => {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }
  return isValid;
}

function pushBookingToDb(booking, foundRental, user, startAt, endAt, res) {
  booking.days = daysController.getRangeOfDates(startAt, endAt).length - 1;
  booking.user = user;
  booking.totalPrice = foundRental.dailyRate * booking.days;
  booking.rental = foundRental;

  foundRental.bookings.push(booking);
  booking.save(err => {
    if (err) {
      return res
        .status(422)
        .send({
          errors: normalizeErrors(err.errors)
        });
    }

    foundRental.save();
    User.updateOne({
        _id: user
      }, {
        $push: {
          bookings: booking
        }
      },
      function () {}
    );
    return res.json({
      message: "Booking successful ! Enjoy !",
      startAt: booking.startAt,
      endAt: booking.endAt,
      days: booking.days,
      totalPrice: booking.totalPrice
    });
  });
}

exports.deleteBookingWhenPaymentFails = async (req, res) => {
  try {
    const user = req.userId;
    const bookingStart = req.params.id
    const foundBooking = await Booking.findOne({ startAt: bookingStart })
    .populate('rental')
    .populate('user')
    if (foundBooking.user._id != user) {
    return console.log('You are not the booking owner');
    } 
    const bookingDelete = await Booking.deleteOne({ _id: foundBooking._id})
    const googleDelete = await googleFunc.deleteGoogleCalEvent(bookingStart);
    const userUpdate = await User.updateOne({ _id : foundBooking.user._id}, {$pull: {bookings: foundBooking._id}})
    const rentalUpdate = await Rental.updateOne({ _id : foundBooking.rental._id}, {$pull: {bookings: foundBooking._id}})
    console.log('Event Removed from DB');
    return res.send({message: 'Event removed from DB and from Google Calendar'})
  }
  catch(e) {
    return res.send({message: e})
  }
}

