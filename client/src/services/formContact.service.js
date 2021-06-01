import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "api/test/send";

class formContactService {
    sendFormContact(name, email, message) {
        return axios.post(API_URL, {name, email, message});
    }

    sendEmailToBooker(message, id) {
        return axios.post(`api/test/booker/send/${id}`, { message }, { headers: authHeader() } );
    }
    sendEmailToHost(message, id) {
        return axios.post(`api/test/host/send/${id}`, { message }, { headers: authHeader() } );
    }
}

export default new formContactService();