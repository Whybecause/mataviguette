import axios from "axios";
import authHeader from "../services/auth-header";
import { trackPromise } from "react-promise-tracker";
import dayjs from 'dayjs';
import addDays from "date-fns/addDays";

function httpResponseToJSON(response) {
  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

class rentalCRUDService {
  async update(data) {
    return await axios.patch("api/test/rentals/update/mataviguette", data, {
      headers: authHeader(),
    });
  }

  async getMataviguette() {
    return await trackPromise(
      axios.get("/api/test/rentals/current", { headers: authHeader() })
    );
  }

  getMataviguettePrice = async (setDailyRate) => {
    try {
      const res = await trackPromise(
        axios.get("/api/test/rentals/current", { headers: authHeader() })
      );
      setDailyRate(res.data.dailyRate);
    } catch (error) {
      console.log(error);
    }
  };

  getUnavailableDates = async (url) => {
      return fetch(url).then((response) => httpResponseToJSON(response))
  }

   getGoogleCalBookedEvents = async (setBookedRangeDays) => {
        const res = await axios.get("/api/test/rentals/booked");
        const data = await res.data;
        let today = new Date()
        let testDate = new Date();
        testDate.setDate(today.getDate() -1);
        
        const getDates = (startDate, endDate) => {
            let dates = [];
            let currentDate = startDate;
            const addDaysFunc = function (days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDaysFunc.call(currentDate, 1);
            }
            return dates;
        };

        try {
          await Promise.all(
              data.map(async (event) => {
                const startDate = new Date(await event.bookedStart);
                const endDate = new Date(await event.bookedEnd);
                const dates = getDates(startDate, endDate);
                dates.forEach(function (date) {
                    setBookedRangeDays((oldArr) => [...oldArr, date]);
                    testDate = addDays(testDate, 1);
                });
              })
          );
        } catch (e) {
        return console.log("No booking dates");
        }
    };
}


export default new rentalCRUDService();

async function getFirstDateAvailable (bookedRangeDays) {
  let currentDate = new Date()
  let testDate = new Date();
  testDate.setDate(currentDate.getDate() -1);
  for (let i=0; i < bookedRangeDays.length; i++) {
    testDate = addDays(testDate, 1);
    if (dayjs(bookedRangeDays[i]).format('DD/MM/YYYY') === dayjs(testDate).format('DD/MM/YYYY')) {
      console.log('already booked');
    } else { 
      console.log(testDate);
      return testDate;
    }
  }
}