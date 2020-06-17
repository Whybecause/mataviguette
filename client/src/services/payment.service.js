import axios from 'axios';
import authHeader from '../services/auth-header';


class PaymentService {
    getSecret(startAt, endAt, userEmail, guests) {
      return axios.post("api/secret", {startAt, endAt, userEmail, guests},  {headers: authHeader()});
      }
}

export default new PaymentService();