    exports.googleAuthAndCheckDates = (booking, callBack) => {
        //LA CEST LAUTHENTIFICATION POUR L'API

        const fs = require('fs');
        const readline = require('readline');
        const {
            google
        } = require('googleapis');


        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/calendar'];
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        const TOKEN_PATH = 'token.json';

        // Load client secrets from a local file.

        fs.readFile('google-credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Calendar API.
            authorize(JSON.parse(content), pushToGoogleCalendar);
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

        function pushToGoogleCalendar(auth) {
            const calendar = google.calendar({
                version: 'v3',
                auth
            })
            const eventStartTime = booking.startAt
            const eventEndTime = booking.endAt
            eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

            // const eventStartTime = new Date()
            // eventStartTime.setDate(eventStartTime.getDay() + 2)
            // const eventEndTime = new Date()
            // eventEndTime.setDate(eventEndTime.getDay() + 2)
            // eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

            const event = {
                summary: "Reserved",
                description: "Reserved Booking",
                start: {
                    dateTime: eventStartTime,
                    timeZone: 'GMT',
                },
                end: {
                    dateTime: eventEndTime,
                    timeZone: 'GMT',
                }
            }

           
            calendar.freebusy.query({
                    resource: {
                        timeMin: eventStartTime,
                        timeMax: eventEndTime,
                        timeZone: 'GMT',
                        items: [{
                            id: 'primary',
                            busy: 'Active'
                        }],
                    },
                },
                
                (err, res) => {
                    if (err) return console.error('FB query error: ' , err)
                    const eventsArr = res.data.calendars.primary.busy
                    const isValidDates = true;
                        if (eventsArr.length === 0) {
                            return calendar.events.insert(
                                { calendarId: 'primary', resource: event},
                                err => {
                                    if (err) return console.error('Calendar Event Creation Error', err);
                                    console.log('Event Created in Google Calendar');
                                    return callBack(isValidDates);
                                }
                            )}
                        console.log('Dates are not available in Google Calendar');
                        return callBack(!isValidDates);

                }
            )
        }
    }

    // ---------------------------- DELETE EVENT FUNCTION, USED IN BOOKING CONTROLLER

    // module.exports = function deleteGoogleCalEvent (booking) {
        exports.deleteGoogleCalEvent = (startAt) => {
        //LA CEST LAUTHENTIFICATION POUR L'API

        const fs = require('fs');
        const readline = require('readline');
        const {
            google
        } = require('googleapis');


        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/calendar'];
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        const TOKEN_PATH = 'token.json';
            // Load client secrets from a local file.
    
            fs.readFile('google-credentials.json', (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Calendar API.
                authorize(JSON.parse(content), findGoogleCalIdAndDelete);
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
    
            function findGoogleCalIdAndDelete(auth) {
                const calendar = google.calendar({
                    version: 'v3',
                    auth
                });
                // const eventStartTime = booking.startAt;
                // const eventEndTime = booking.endAt;
    
                calendar.events.list({
                    calendarId: 'primary',
                    timeMin: startAt,
                }, (err, events) => {
                    if (err) {
                        return console.log('error API')
                    }

                    if (events.data.items.length) {
                        const eventId = events.data.items[0].id
                        return calendar.events.delete({
                            calendarId: 'primary',
                            eventId: eventId,
                        }, function (err) {
                            if (err) {
                                return console.log(err + 'Error Event Delete');
                            }
                            return console.log('Event Removed From Google Calendar');
                        });
                    }
                    else {
                        return console.log('Nos upcoming booking')
                    }
                });
            }
    }








     