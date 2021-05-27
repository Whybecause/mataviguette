import axios from 'axios';
import authHeader from '../services/auth-header';
import { trackPromise } from 'react-promise-tracker';
import moment from 'moment';

const API_URL = "api/test/bookings";



class BookingService {
    createBooking(startAt, endAt, guests) {
      return trackPromise (axios.post(API_URL + "/Mataviguette", { startAt, endAt, guests}, {headers: authHeader()} ))
      }
    deleteBooking(startAt) {
      return axios.delete("api/test/booking/delete", {headers: authHeader()}, {startAt} )
    }
}

export default new BookingService();