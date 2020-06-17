const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const moment = require('moment');
const daysController = require ('./days.controller');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

exports.getGoogleCalListEvents = (req, res) => {
    // OAUTH2 AUTHENTIFICATION
    authorize(JSON.parse(process.env.GOOGLE_CREDENTIALS), listEvents);
    function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
          oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
          callback(oAuth2Client);
      }
      
      //CALL API
    function listEvents(auth) {
        const calendar = google.calendar({
            version: 'v3',
            auth
        });
        // Call google to fetch events for today on our calendar
        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, events) => {
            if (err) {
                return console.log('The API returned an error: ' + err);
            }  
            const allEvents = events.data.items;
            if (allEvents.length) {
                getEvents(allEvents, function(response) {
                    res.send(response);
                 });
            }
            else {
                res.send({ message: "No upcoming booking"});
            }           
        });
    }
}

getEvents = async (allEvents, callback) => {
    const result = await allEvents.map( (event, i) => {
        const bookedStart = event.start.dateTime;
        const bookedEnd = event.end.dateTime;
        const bookedDays = daysController.getRangeOfDates(bookedStart, bookedEnd).length - 1;

        return ({ bookedStart: bookedStart, bookedEnd: bookedEnd, bookedDays: bookedDays});
    });
    return callback(result);
}

    
    