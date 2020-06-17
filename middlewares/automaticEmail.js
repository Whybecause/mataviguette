const nodemailer = require('nodemailer');
const moment = require('moment');

module.exports = function sendEmail (email, username, booking, foundRental) {
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user : process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
    });

    const mailOptions = {
    from : "mataviguette@gmail.com",
    to : email,
    subject: 'Confirmation de réservation à la Mataviguette ! ',
    html: `<h1>Merci ${username}, votre réservation est validée ! </h1><h2>Récapitulatif de votre futur séjour</h2><p>Début de la location : ${moment(booking.startAt).format('Do-MMM-YYYY')}</p><p>Fin de la location : ${moment(booking.endAt).format('Do-MMM-YYYY')}</p><p>Nombre de jours : ${booking.days}</p><p>Nombre de personnes : ${booking.guests}</p><p>Prix Total : ${booking.totalPrice} euros</p><p>Adresse  :${foundRental.street}</p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        return console.log(error);
    } else {
        return console.log('Email sent: ' + info.response);
    }
    });
}

