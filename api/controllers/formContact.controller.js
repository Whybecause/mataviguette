const Validator = require('validator');
const  { emailTemplate }  = require('../emails/emailTemplate');
const dayjs = require('dayjs');
const db = require('../models');
const Booking = db.booking;
const { transporter } = require('../emails/transporter')

exports.sendContactForm = (req, res) => {
    (async function() {
        try {
            const { name, email, message } =  req.body;
            const header = `Message de ${name} (${email})`
            const html = await emailTemplate(header, message);

            const mailOptions = {
            from : name,
            to : process.env.ADMIN_EMAIL,
            subject: 'Nouveau message depuis le formulaire de contact',
            html: html
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

            else {
                await transporter.sendMail(mailOptions) 
                return res.status(200).send({ message: 'Votre message a été envoyé !' });           
            }

        } catch(e) {
            console.log(e);
            return res.status(400).send({ message: "Le message n\'a pas pu être envoyé" })
        }
    })()
}

exports.sendEmailToBooker = (req, res) => {
    const bookingId = req.params.id
    const message = req.body.message
    Booking.findOne({ _id: bookingId})
    .populate('user')
    .then( async booking => {
        const header = `Votre réservation du ${dayjs(booking.startAt).format('DD/MM/YYYY')} au ${dayjs(booking.endAt).format('DD/MM/YYYY')}`
        const buttonText = "lamataviguette.fr"
        const buttonLink= "https://www.lamataviguette.fr"
        const html = await emailTemplate(header, message, buttonText, buttonLink);

        const mailOptions = {
            from: process.env.DOMAIN_EMAIL,
            to: booking.user.email,
            subject: 'Message de lamataviguette.fr',
            html: html
        };
        transporter.sendMail(mailOptions, function(error) {
            if (error) {
                return res.status(400).send({ message: 'Le message n\'a pas pu être envoyé' + error})
            } else {
            return res.status(200).send({ message: 'Votre message a été envoyé !'});
            }
        })
    })
    .catch(error => res.status(500).send({ message:'Une erreur est survenue...' + error}));
}

exports.sendEmailToHost = (req, res) => {
    const bookingId = req.params.id
    const message = req.body.message
    Booking.findOne({ _id: bookingId})
    .populate('user')
    .then ( async booking => {

        const header = `Message de ${booking.user.username} (${booking.user.email}) - Réservation du ${dayjs(booking.startAt).format('DD/MM/YYYY')} au ${dayjs(booking.endAt).format('DD/MM/YYYY')} `
        const html = await emailTemplate(header, message);

        const mailOptions = {
            from: booking.user.email, 
            to : process.env.ADMIN_EMAIL,
            subject: `Nouveau message d'un locataire`,
            html: html
        };
        transporter.sendMail(mailOptions, function(error) {
            if (error) {
                return res.status(400).send({ message: 'Le message n\'a pas pu être envoyé' })
            } else {
                return res.status(200).send({ message: 'Votre message a été envoyé !'});
            }
        })
    })
    .catch(error => res.status(500).send({ message: 'Une erreur est survenue...'}))
}