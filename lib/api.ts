import axios from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export default api;
