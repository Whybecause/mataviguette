import axios from 'axios';
import authHeader from '../services/auth-header';
const API_URL = "api/test/rentals/update/mataviguette";

class rentalCRUDService {
    update(data) {
        return axios.patch(API_URL, (data), { headers: authHeader() });
    }
}

export default new rentalCRUDService();