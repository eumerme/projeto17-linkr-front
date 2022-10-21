import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("linkr"));

  if (auth !== null) {
    console.log(auth.token);
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    return config;
  }
}

async function register(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

async function login(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

async function publish(body) {
  const config = createHeaders();
  return axios.post(`${BASE_URL}/timeline/publish`, body, config);
}

async function listPosts() {
  return axios.get(`${BASE_URL}/timeline/posts`);
}

async function userLogout() {
  const config = createHeaders();
  return axios.post(`${BASE_URL}/logout`, {}, config);
}

async function listHashtags() {
  return axios.get(`${BASE_URL}/hashtags`);
}

async function listPostsbyHashtags(body) {
  return axios.get(`${BASE_URL}/hashtags/${body}`);
}

async function editPostText(text, id) {
  const config = createHeaders();
  return axios.put(`${BASE_URL}/timeline/posts/update/${id}`, text, config);
}

export {
  register,
  login,
  publish,
  listPosts,
  userLogout,
  listHashtags,
  listPostsbyHashtags,
  editPostText,
};
