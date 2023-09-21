import axios from "axios";
import { config } from "../config/config";

const api = axios.create({
  baseURL: `${config.url.API_BASE_URL}`,
});

export const setAuthToken = (token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export default api;
