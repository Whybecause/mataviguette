import axios from "axios";
import authHeader from "../services/auth-header";
import { trackPromise } from "react-promise-tracker";

function httpResponseToJSON(response) {
  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

class rentalCRUDService {
  fetcher = async (url) => {
      return fetch(url).then((response) => httpResponseToJSON(response))
  }

  async update(data) {
    return await axios.patch("api/test/rentals/update/mataviguette", data, {
      headers: authHeader(),
    });
  }

  async getMataviguette() {
    return await trackPromise(
      axios.get("/api/test/rentals/current", { headers: authHeader() })
    );
  }

  getMataviguettePrice = async (setDailyRate) => {
    try {
      const res = await trackPromise(
        axios.get("/api/test/rentals/current", { headers: authHeader() })
      );
      setDailyRate(res.data.dailyRate);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new rentalCRUDService();
