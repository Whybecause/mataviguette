import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL = "api/test/bookings";
class BookingService {
  async createBooking(startAt, endAt, guests, username) {
    return axios.post(API_URL + "/Mataviguette", { startAt, endAt, guests, username}, {headers: authHeader()} )
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
  async deleteBookingWhenPaymentFails(startAt) {
      try {
        return await axios.delete(`api/test/booking/delete/${startAt}`, {headers: authHeader()} )
      } catch (error) {
        throw new Error(error.message)
      }
    }

    async deleteBooking(id) {
      return await axios.delete(`/api/test/booking/delete/admin/${id}`, {headers: authHeader() });
    }
}

export default new BookingService();