import axios from "axios";

const baseURL = "https://tech-challenge-node-latest.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
