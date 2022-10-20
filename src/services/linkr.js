import axios from "axios";

const BASE_URL = "http://localhost:4000";

function register(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function login(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

function publish(body) {
  return axios.post(`${BASE_URL}/timeline/publish`, body);
}

function listPosts(){
  return axios.get(`${BASE_URL}/timeline/posts`);
}

export { register, login, publish, listPosts };