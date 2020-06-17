import axios from 'axios';
import authHeader from './auth-header';
import { trackPromise } from 'react-promise-tracker';

// const API_URL = 'http://localhost:8080/api/test/';
const API_URL = "api/test/";
// const API_URL = 'https://mataviguette.herokuapp.com/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
 }

  getUserBoard() {
    return trackPromise (axios.get(API_URL + 'user', { headers: authHeader() }));
  }

  getModeratorBoard() {
    return trackPromise (axios.get(API_URL + 'mod', { headers: authHeader() }));
  }

  getAdminBoard() {
    return trackPromise (axios.get(API_URL + 'admin', { headers: authHeader() }));
  }
}

export default new UserService();