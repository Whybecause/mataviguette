const { google } = require('googleapis');
const daysController = require ('./days.controller');

//Utilisé pour le front pour désactiver les dates indisponibles dans le datepicker
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
    async function listEvents(auth) {
        const calendar = google.calendar({
            version: 'v3',
            auth
        });

        let allBookedDates = [];

        //récupération des réservations du google calendar pour mataviguette.fr
        await listEventsFromCalId('primary', calendar, function(response) {
            allBookedDates.push.apply(allBookedDates, response);
            // Récupération des réservations de airbnb (depuis la synchro sur le google calendar)
            listEventsFromCalId('t6irs8vvh0l88mqt7m0ok36hil2t88fk@import.calendar.google.com', calendar, function(response) {
                allBookedDates.push.apply(allBookedDates, response);
                return res.send(allBookedDates)
            })
        })  
    }
}

listEventsFromCalId = async (calendarId, calendar, callback) => {
    await calendar.events.list({
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    }, async (err, events) => {
        if (err) {
            return console.log('The API returned an error: ' + err);
        }  
        else {
            getEvents(events.data.items, function(response) {
                return callback(response);
            })
        }       
    });
}

getEvents = async (allEvents, callback) => {
    const result = await allEvents.map( (event, i) => {
        const bookedStart = event.start.dateTime || event.start.date;
        const bookedEnd = event.end.dateTime || event.end.date;
        const bookedDays = daysController.getRangeOfDates(bookedStart, bookedEnd).length - 1;

        return ({ bookedStart: bookedStart, bookedEnd: bookedEnd, bookedDays: bookedDays});
    });
    return callback(result);
}
