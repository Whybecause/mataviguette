const db = require('../models');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2 (
  process.env.OAUTH2_ID,
  process.env.OAUTH2_CODE,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();
const Validator = require('validator');
const User = db.user;
const Booking = db.booking;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.ADMIN_EMAIL,
      clientId: process.env.OAUTH2_ID,
      clientSecret: process.env.OAUTH2_CODE,
      refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
      accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
    });

exports.sendContactForm = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const content = `name: ${name} \n email: ${email} \n message: ${message}`
    const mailOptions = {
    from : name,
    to : process.env.ADMIN_EMAIL,
    subject: 'Nouveau message depuis le formulaire de contact',
    text: content
    };

    if(req.body.name.length === 0) {
        return res.status(400).send({ message: 'Name field is required'})
    }
    if (Validator.isEmpty(req.body.email)) {
        return res.status(400).send({ message: 'Email field is required'})
    } else if (!Validator.isEmail(req.body.email)) {
        return res.status(400).send({ message: 'Email is invalid'})
    }
    if(req.body.message.length === 0) {
        return res.status(400).send({ message: 'Message field is required'})
    }

    transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        return res.status(400).send({ error: "Le message n\'a pas pu être envoyé'" })
    } else {
        return res.status(200).send({ message: 'Votre message a été envoyé !' });
    }
    });
}

exports.sendEmailToBooker = (req, res) => {
    const bookingId = req.params.id
    const message = req.body.message
    Booking.findOne({ _id: bookingId})
    .populate('user')
    .then( booking => {
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: booking.user.email,
            subject: 'Message de lamataviguette.fr',
            text: message
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return res.status(400).send({ error: 'Le message n\'a pas pu être envoyé'})
            } else {
            return res.status(200).send({ message: 'Votre message a été envoyé !'});
            }
        })
    })
    .catch(error => res.status(500).send({ error:'Une erreur est survenue...'}));
}

exports.sendEmailToHost = (req, res) => {
    const bookingId = req.params.id
    const message = req.body.message
    Booking.findOne({ _id: bookingId})
    .populate('user')
    .then ( booking => {
        const mailOptions = {
            from: booking.user.email, 
            to : process.env.ADMIN_EMAIL,
            subject: `Nouveau message d'un locataire`,
            text: `Envoyé par : ${booking.user.username}, ${booking.user.email} \n ${message}`
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return res.status(400).send({ error: 'Le message n\'a pas pu être envoyé' })
            } else {
                return res.status(200).send({ message: 'Votre message a été envoyé !'});
            }
        })
    })
    .catch(error => res.status(500).send({ error: 'Une erreur est survenue...'}))
}