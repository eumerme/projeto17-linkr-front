import axios from "axios";

const BASE_URL = "http://localhost:4000";

function register(body) {
  return axios.post(`${BASE_URL}/signup`, body);
}

function publish(body) {
  return axios.post(`${BASE_URL}/timeline/publish`, body);
}

export { register, publish };
