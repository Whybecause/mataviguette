import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "api/test/send";

class formContactService {
    sendFormContact(data) {
        return axios.post(API_URL, {name : data.name, email : data.email, message: data.message});
    }

    sendEmailToBooker(message, id) {
        return axios.post(`api/test/booker/send/${id}`, { message }, { headers: authHeader() } );
    }
    sendEmailToHost(message, id) {
        return axios.post(`api/test/host/send/${id}`, { message }, { headers: authHeader() } );
    }
}

export default new formContactService();