import axios from "axios";

// const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const BASE_URL = `http://localhost:4000`;

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

async function editPostText(body, id) {
  const config = createHeaders();
  return axios.put(`${BASE_URL}/timeline/posts/update/${id}`, body, config);
}

async function deleteFatalPost(id) {
  const config = createHeaders();
  return axios.delete(`${BASE_URL}/timeline/posts/delete/${id}`, config);
}

function likes(body){
	return axios.post(`${BASE_URL}/timeline/likes`, body);
}

export {
	register,
	login,
	publish,
	listPosts,
	userLogout,
	listHashtags,
	listPostsbyHashtags,
	likes,
  editPostText,
  deleteFatalPost,
};
