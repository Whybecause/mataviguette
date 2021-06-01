import axios from 'axios';
import authHeader from '../services/auth-header';
const API_URL = "api/test/rentals/update/mataviguette";

class rentalCRUDService {
    async update(data) {
        return await axios.patch(API_URL, (data), { headers: authHeader() });
    }

    async getMataviguette() {
        return await axios.get("/api/test/rentals/current", { headers : authHeader() })
    }
}

export default new rentalCRUDService();