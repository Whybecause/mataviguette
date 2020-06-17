const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

exports.googleAuthAndCheckDates = (booking, callBack) => {
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
      summary: "Reserved",
      description: "Reserved Booking",
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
        console.log("Dates are not available in Google Calendar");
        return callBack(!isValidDates);
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
          return console.log("Nos upcoming booking");
        }
      }
    );
  }
};
