import axios from 'axios';
import authHeader from './auth-header';

class CommentService {
    async submitComment(id, text) {
        return await axios.post(`/api/test/comment/${id}`, {text}, {headers: authHeader()} );
    }

    async getUserComment(id) {
        return await axios.get(`/api/test/comment/${id}`, { headers: authHeader()})
    }

    async getAllComments(setComments) {
        try {
            const res = await axios.get("/api/test/comment");
            setComments(res.data);
        } catch(error) {
            console.log(error);
        }
    }
    
    async updateUserComment(id, text) {
        return await axios.patch(`/api/test/comment/update/${id}`, {text}, { headers : authHeader() })
    }
    async deleteUserComment(id) {
        return await axios.delete(`/api/test/comment/delete/${id}`, { headers : authHeader() })
    }
}

export default new CommentService();