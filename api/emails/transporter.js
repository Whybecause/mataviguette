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

exports.transporter = nodemailer.createTransport({
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

  