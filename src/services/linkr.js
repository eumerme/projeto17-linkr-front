import axios from "axios";

const BASE_URL = "http://localhost:4000";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("linkr"));

  if (auth) {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    return config;
  }
}

function register(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function login(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

function publish(body) {
  const config = createHeaders();
  return axios.post(`${BASE_URL}/timeline/publish`, body, config);
}

function listPosts() {
  return axios.get(`${BASE_URL}/timeline/posts`);
}

export { register, login, publish, listPosts };
