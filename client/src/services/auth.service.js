import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import authHeader from '../services/auth-header';

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "api/auth/";

// const API_URL = "https://mataviguette.herokuapp.com/api/auth/";


class AuthService {
  login(email, password) {
    return trackPromise( axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      }));
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, password2) {
    return trackPromise (axios.post(API_URL + "signup", {
      username,
      email,
      password,
      password2
    }));
  }

  isValidToken = async (setIsValidToken) => {
    try {
      const res = await trackPromise(axios.get("api/token", { headers: authHeader() }))
      setIsValidToken(res.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  getCurrentUser = async (setUser, setIsAdmin) => {
    try {
      const user = await JSON.parse(localStorage.getItem('user'))
      if (user) {
        setUser(user.username);
        if (user.roles.includes("ROLE_ADMIN")) {
          setIsAdmin(true);
        }
    }
  }
    catch (error) {
      console.log(error)
    }
  }

  confirmAccount(token, email) {
    return axios.post("/api/confirmation", {email, token});
  }

  resendConfirmAccount(email) {
    return axios.post("/api/resend", {email});
  }

  updatePassword(data) {
    return axios.patch("api/auth/password/update", (data), { headers: authHeader() } );
  }

  sendMailResetPass(email) {
    return axios.post("/api/password/send", {email});
  }

  resetPass(token, email, password, password2) {
    return axios.post("/api/password/reset", {token, email, password, password2});
  }
}

export default new AuthService();