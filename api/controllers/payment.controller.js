const db = require('../models');
const Rental = db.rental;
const User = db.user;
const daysController = require('./days.controller');
const moment = require ('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getSecret = async (req, res) => {
  const startAt = req.body.startAt;
  const endAt = req.body.endAt;
  const guests = req.body.guests;
  const userEmail = req.body.userEmail;

  
  Rental.findOne({title: 'Mataviguette'})
    .exec( async (err, foundRental) => {
      try {
        if (err) {
          return console.log(err);
        }
        const totalDays = daysController.getRangeOfDates(startAt, endAt).length - 1;
        const totalPrice = foundRental.dailyRate * totalDays;
        const user = await User.findById(req.userId);
        const messageEmail = 
        `Merci ${user.username}, votre réservation est validée! 
        Début de la location: ${moment(startAt).format('DD-MMM-YYYY')}
        Fin de la location: ${moment(endAt).format('DD-MMM-YYYY')}
        Nombre de jours: ${totalDays}
        Nombre de personnes: ${guests}
        Adresse: ${foundRental.street}
        N'hésitez pas à revenir vers moi pour toute information complémentaire,
        Valérie`
        const intent = await stripe.paymentIntents.create({
          amount: totalPrice *100,
          currency: 'eur',
          payment_method_types: ['card'],
          receipt_email: userEmail,
          description: messageEmail,
        })
        res.send({client_secret: intent.client_secret});
      } catch (e) {
        res.send({message: e})

      }
    })
}