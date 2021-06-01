import axios from 'axios';
import authHeader from '../services/auth-header';
import { trackPromise } from 'react-promise-tracker';

const API_URL = "api/test/bookings";
class BookingService {
  async createBooking(startAt, endAt, guests) {
    return trackPromise (axios.post(API_URL + "/Mataviguette", { startAt, endAt, guests}, {headers: authHeader()} ))
  }

  async getAllUserBookings() {
    try {
      return await axios.get('/api/test/bookings/user/all', { headers : authHeader()})
    } catch(error) {
      throw new Error(error.message)
    }
  }
  
  async getAllBookings() {
    try {
      return await axios.get('/api/test/bookings/all', {headers: authHeader() })
    } catch(error) {
      throw new Error(error.message)
    }
  }
  async getCurrentBookings() {
    try {
      return await axios.get('/api/test/bookings/current', {headers: authHeader() })
    } catch(error) {
      throw new Error(error.message)
    }
  }
  async deleteBooking(startAt) {
      try {
        return await axios.delete(`api/test/booking/delete/${startAt}`, {headers: authHeader()} )
      } catch (error) {
        throw new Error(error.message)
      }
    }
}

export default new BookingService();