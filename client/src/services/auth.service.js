import axios from "axios";
import authHeader from '../services/auth-header';

const API_URL = "api/auth/";

class AuthService {

  async login(data) {
      const res = await await axios.post(API_URL + "signin", {email : data.email, password : data.password})
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
  }

  async register(data) {
    return axios.post(API_URL + "signup", {
      username : data.username,
      email : data.email,
      password : data.password,
      password2 : data.password2
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  isValidToken = async () => {
    try {
      await axios.get("api/token", { headers: authHeader() })
    }
    catch (error) {
      console.log(error)
      localStorage.removeItem("user");
    }
  }

  isValidAdmin = async (setIsAdmin) => {
    try {
      await axios.get("api/admin", { headers: authHeader() })
      setIsAdmin(true);
    }
    catch (error) {
      console.log(error)
    }
  }

  getCurrentUser = async (setUser, setUserEmail) => {
    try {
      const user = await JSON.parse(localStorage.getItem('user'))
      if (user) {
        setUser(user.username);
        setUserEmail(user.email)
    }
  }
    catch (error) {
      console.log(error)
    }
  }

  
  sendMailResetPass(data) {
    return axios.post("/api/password/send", {email : data.email});
  }
  
  resetPass(token, email, password, password2) {
    return axios.post("/api/password/reset", {token, email, password, password2});
  }

  resendConfirmAccount(data) {
    return axios.post("/api/resend", {email : data.email});
  }
  
  confirmAccount(token, email) {
    return axios.post("/api/confirmation", {email, token});
  }

  updatePassword(data) {
    return axios.patch("api/auth/password/update", (data), { headers: authHeader() } );
  }

  async updateEmail(data) {
    return await axios.patch("/api/auth/email/update", (data), {headers: authHeader()});
  }

  async deleteUser() {
    return await axios.delete("/api/v1/user/delete", {headers: authHeader()});
  }

}

export default new AuthService();