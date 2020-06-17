import axios from 'axios';
import authHeader from './auth-header';
import { trackPromise } from 'react-promise-tracker';

// const API_URL = "http://localhost:8080/api/test";
const API_URL = "api/test";

// const API_URL = "https://mataviguette.herokuapp.com/api/test";

class CommentService {
    submitComment(text) {
        return trackPromise(axios.post(API_URL + "/comment", {text}, {headers: authHeader()} ));
    }
}

export default new CommentService();