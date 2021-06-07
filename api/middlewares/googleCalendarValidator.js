const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Vérification des dates pour éviter que des réservations se chevauchent + push dans google calendar si ok

exports.googleAuthAndCheckDates = (booking, username, finalPrice, callBack) => {
  //LA CEST LAUTHENTIFICATION POUR L'API
  authorize(JSON.parse(process.env.GOOGLE_CREDENTIALS), pushToGoogleCalendar);
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
    callback(oAuth2Client);
  }

  //   CALL API ----------------------------------

  function pushToGoogleCalendar(auth) {
    const calendar = google.calendar({
      version: "v3",
      auth,
    });
    const eventStartTime = booking.startAt;
    const eventEndTime = booking.endAt;
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
    const event = {
      summary: `${username}, ${finalPrice}€`,
      description: "Mataviguette Booking",
      start: {
        dateTime: eventStartTime,
        timeZone: "GMT",
      },
      end: {
        dateTime: eventEndTime,
        timeZone: "GMT",
      },
    };

    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          timeZone: "GMT",
          items: [
            {
              id: "primary",
              busy: "Active",
            },
          ],
        },
      },

      (err, res) => {
        if (err) return console.error("FB query error: ", err);
        const eventsArr = res.data.calendars.primary.busy;
        const isValidDates = true;
        if (eventsArr.length === 0) {
          return calendar.events.insert(
            { calendarId: "primary", resource: event },
            (err) => {
              if (err)
                return console.error("Calendar Event Creation Error", err);
              console.log("Event Created in Google Calendar");
              return callBack(isValidDates);
            }
          );
        }
        console.log("Dates are not available in Mataviguette Google Calendar");
        return callBack(!isValidDates);
      }
    );
  }
};

//Vérification de la plage de dates sur le calendrier AirBnb

exports.checkAirBnbDates = (booking, callBack) => {
  //LA CEST LAUTHENTIFICATION POUR L'API
  authorize(JSON.parse(process.env.GOOGLE_CREDENTIALS), checkAirbnb);
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
    callback(oAuth2Client);
  }

  //   CALL API ----------------------------------
  function checkAirbnb(auth) {
    const calendar = google.calendar({
      version: "v3",
      auth,
    });
    const eventStartTime = booking.startAt;
    const eventEndTime = booking.endAt;
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          timeZone: "GMT",
          items: [
            {
              id: "t6irs8vvh0l88mqt7m0ok36hil2t88fk@import.calendar.google.com",
              busy: "Active",
            },
          ],
        },
      },
      
      (err, res) => {
        if (err) return console.error("FB query error on AirBnb: ", err);
        const eventsArr = res.data.calendars["t6irs8vvh0l88mqt7m0ok36hil2t88fk@import.calendar.google.com"].busy;
        const isValidDates = true;
        if (eventsArr.length === 0) {
          console.log('Dates dispo dans Airbnb')
            return callBack(isValidDates);
          }
        else {
          console.log('Dates pas dispo dans Airbnb');
          return callBack(!isValidDates);
        }
      }
    );
  }
};

// ---------------------------- DELETE EVENT FUNCTION, USED IN BOOKING CONTROLLER

exports.deleteGoogleCalEvent = (startAt) => {

  //LA CEST LAUTHENTIFICATION POUR L'API -------------------------
  authorize(
    JSON.parse(process.env.GOOGLE_CREDENTIALS),
    findGoogleCalIdAndDelete
  );
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
    callback(oAuth2Client);
  }

//   CALL API ----------------------------------
  function findGoogleCalIdAndDelete(auth) {
    const calendar = google.calendar({
      version: "v3",
      auth,
    });

    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: startAt,
      },
      (err, events) => {
        if (err) {
          return console.log("error API");
        }

        if (events.data.items.length) {
          const eventId = events.data.items[0].id;
          return calendar.events.delete(
            {
              calendarId: "primary",
              eventId: eventId,
            },
            function (err) {
              if (err) {
                return console.log(err + "Error Event Delete");
              }
              return console.log("Event Removed From Google Calendar");
            }
          );
        } else {
          return console.log("No upcoming booking");
        }
      }
    );
  }
};
