const db = require('../models');
const User = db.user;
const Booking = db.booking;
const Rental = db.rental;
const {
  normalizeErrors
} = require("../helpers/mongoose");
const moment = require('moment');
const Validator = require('validator');
const daysController = require('./days.controller');
const googleFunc = require('../middlewares/googleCalendarValidator');
const dayjs = require('dayjs');
const { google } = require('googleapis');

exports.createBooking = async (req, res) => {
  const {
    startAt,
    endAt,
    totalPrice,
    guests,
    days,
    username
  } = req.body;    
  const user = req.userId;
  const totalDays = daysController.getRangeOfDates(startAt, endAt).length - 1
  
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  });

  if (Validator.isEmpty(req.body.startAt)) {
    return res.status(400).send({
      message: "Vous devez sélectionner une date de début!"
    });
  }

  if (Validator.isEmpty(req.body.endAt)) {
    message.endAt = "Vous devez sélectionner une date de fin";
  }

  if (Validator.isEmpty(req.body.guests)) {
    return res.status(400).send({
      message: "Indiquez le nombre de personnes!"
    });
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
          const finalPrice = foundRental.dailyRate * totalDays
          const airBnbResponse = await googleFunc.checkAirBnbDates(booking, function(response) {
            if (response === true) {
                const googleResponse = googleFunc.googleAuthAndCheckDates(booking, username, finalPrice, async function(response) {
                 if (response === true && isValidBooking(booking, foundRental)) {
                       console.log("Event created in DB")
                       return pushBookingToDb(booking, foundRental, user, totalDays, finalPrice, res);
                   }
                   else {
                     return res.status(422).json({message: "Désolé, ces dates ne sont pas disponibles ! "});
                   }
                 })
            }
            else {
              return res.status(422).json({message: "Désolé, ces dates ne sont pas disponibles ! "});
            }
          })
        
        }
        catch(e) {
            console.log("Error in Booking Creation");
            res.status(422).json({ message: "Une erreur est survenue, réessayez plus tard"});

        }
    });
};



exports.getAllUserBookings = (req, res) => {
  const user = req.userId;
  Booking.where({
      user
    })
    .populate("rental", '-bookings' )
    .sort({
      "startAt": 'desc'
    })
    .exec((err, foundBookings) => {
      if (err) {
        return res.status(422).send({
          message: err
        });
      }
      if (foundBookings.length === 0) {
        return res.status(404).send({
          message: "Vous n'avez aucune réservation"
        });
      } else {
        return res.json(foundBookings);
      }
    });
};

exports.getAllBookings = (req, res) => {
  Booking.find()
  .populate('user', '-comments -password -bookings -rentals -roles -isVerified -_id -__v') 
  .sort({
    "startAt": 'desc'
  })
  .exec(function(err, bookings) {
    if (err) return handleError(err);
    res.send(bookings);
  })
};

exports.getCurrentBookings = (req, res) => {
  Booking.find({
      endAt: { 
        $gte: dayjs().startOf('day')
      }
  })
  .populate('user', '-comments -password -bookings -rentals -roles -isVerified -_id -__v') 
  .exec(function(err, bookings) {
    if (err) return handleErors(err);
    res.send(bookings);
  })
}

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

function pushBookingToDb(booking, foundRental, user, totalDays, finalPrice, res) {
  booking.days = totalDays;
  booking.user = user;
  booking.totalPrice = finalPrice;
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
    await Booking.deleteOne({ _id: foundBooking._id})
    await googleFunc.deleteGoogleCalEvent(bookingStart);
    await User.updateOne({ _id : foundBooking.user._id}, {$pull: {bookings: foundBooking._id}})
    await Rental.updateOne({ _id : foundBooking.rental._id}, {$pull: {bookings: foundBooking._id}})
    console.log('Event Removed from DB');
    return res.send({message: 'Event removed from DB and from Google Calendar'})
  }
  catch(e) {
    return res.send({message: e})
  }
}

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id }).populate('rental').populate('user')

    await googleFunc.deleteGoogleCalEvent(booking.startAt);
    await Booking.deleteOne({ _id : booking._id });
    await Rental.updateOne({ _id : booking.rental._id}, {$pull: {bookings: booking._id}} )
    if (booking.user) {
      await User.updateOne({ _id: booking.user._id}, {$pull: {bookings: booking._id }} )
    }
    
    return res.status(200).send({ message: 'Réservation supprimée'})

  } catch(error) {
    return res.status(400).send({ message: 'Impossible de supprimer la réservation' + error})
  }
}

