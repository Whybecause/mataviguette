const db = require('../models');
const Booking = db.booking;
const Rental = db.rental;
const User = db.user;
const { normalizeErrors } = require("../helpers/mongoose");


exports.createRental = (req, res) => {
  const {
    title,
    city,
    street,
    category,
    bedrooms,
    shared,
    dailyRate
  } = req.body;
  const rental = new Rental({
    title,
    city,
    street,
    category,
    bedrooms,
    shared,
    dailyRate,
    user: req.userId
  });

  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    User.updateOne(
      { _id: req.userId},
      { $push: { rentals: newRental}},
      function() {}
    );
    return res.json(newRental)
  });
};

// exports.getRentalById = (req, res) => {
//   Rental.findById(req.params.id)
//   .exec((err, foundRental) => {
//     if (err) {
//       return res.status(422).send({ message: "Could not found rental"})
//     };
//     return res.json(foundRental);

//   });
// }

exports.getMataviguette = (req, res) => {
  Rental.findOne({ 
    title: 'Mataviguette'
  })
  .then(
    (rental) => {
    res.status(200).send({
      id : rental.id,
      title: rental.title,
      city: rental.city,
      street: rental.street,
      bedrooms: rental.bedrooms,
      dailyRate: rental.dailyRate,
      category: rental.category,
      // bookings: rental.bookings,
    });
  }
  ).catch(
    (error) => {
    res.status(404).json({ 
      error: error
    });
  }
  );
};

exports.getUserRentals = (req, res) => {
  const user = req.userId;
  Rental.where({ user })
  .populate('user')
  .exec( (err, foundRentals) => {
    if (err) {
      return res.status(422).send({ message: err});
    }
    if (foundRentals.length === 0) {
      return res.status(404).send({ message: "You don't have any rentals yet"});
    } else {
      return res.status(200).send({ rentals: foundRentals})
    }
  });
}

exports.rentalUpdateMataviguette = (req, res) => {
  const rentalData = req.body;
  const user = req.userId;
  Rental.findOne({ title: 'Mataviguette'})
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({ message: normalizeErrors(err.errors) });
      }
      if (foundRental.user.id !== user) {
        return res.status(422).send({
          message: 'Tes pas le proprio sorry'
        });
      }
      foundRental.set(rentalData);
      foundRental.save(err => {
        if (err) {
          return res.status(422).send({ message: normalizeErrors(err.errors) });
        } 
          return res.status(200).send({ message: 'Annonce modifiée ! ', foundRental});
        
      });
    });
};

// exports.deleteRentalById = (req, res) => {
//   const user = req.userId;

//   Rental.findById(req.params.id)
//     .populate("user", "_id")
//     .populate({
//       path: "bookings",
//       select: "startAt",
//       match: {
//         startAt: { $gt: new Date() }
//       }
//     })
//     .exec((err, foundRental) => {
//       console.log(foundRental)
//       if (err) {
//         return res.status(422).send({ errors: normalizeErrors(err.errors) });
//       }
//       if (user !== foundRental.user.id) {
//         return res.status(422).send({
//           errors: [
//             { title: "Invalid User!", detail: "You are not rental owner!" }
//           ]
//         });
//       }
//       if (foundRental.bookings.length > 0) {
//         return res.status(422).send({
//           errors: [
//             {
//               title: "Active bookings",
//               detail: "Cannot delete rental with active bookings!"
//             }
//           ]
//         });
//       }
//       foundRental.remove(err => {
//         if (err) {
//           return res.status(422).send({ errors: normalizeErrors(err.errors) });
//         }
//         return res.json({ status: "deleted" });
//       });
//     });
// };