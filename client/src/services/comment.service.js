import axios from 'axios';
import authHeader from './auth-header';
import { trackPromise } from 'react-promise-tracker';

class CommentService {
    async submitComment(id, text) {
        return await trackPromise(axios.post(`/api/test/comment/${id}`, {text}, {headers: authHeader()} ));
    }

    async getUserComment(id) {
        return await trackPromise(axios.get(`/api/test/comment/${id}`, { headers: authHeader()}))
    }

    async updateUserComment(id, text) {
        return await trackPromise(axios.patch(`/api/test/comment/update/${id}`, {text}, { headers : authHeader() }))
    }
    async deleteUserComment(id) {
        return await trackPromise(axios.delete(`/api/test/comment/delete/${id}`, { headers : authHeader() }))
    }
}

export default new CommentService();