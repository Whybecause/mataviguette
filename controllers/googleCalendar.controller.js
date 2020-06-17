const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const moment = require('moment');
const daysController = require ('./days.controller');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


//GOOGLE CALENDAR LIST EVENTS --------------------------------------------------

exports.getGoogleCalListEvents = (req, res) => {
    // Load client secrets from a local file.
    fs.readFile('google-credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), listEvents);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
        const {
            client_secret,
            client_id,
            redirect_uris
        } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }


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

    
    