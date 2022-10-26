import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("linkr"));

  if (auth !== null) {
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

async function listPosts(limit) {
  const config = createHeaders();
  return axios.get(`${BASE_URL}/timeline/posts?limit=${limit}`, config);
}

async function userLogout() {
  const config = createHeaders();
  return axios.post(`${BASE_URL}/logout`, {}, config);
}

async function listHashtags() {
  const config = createHeaders();
  return await axios.get(`${BASE_URL}/hashtags`, config);
}

async function listPostsbyHashtags(body) {
  const config = createHeaders();
  return axios.get(`${BASE_URL}/hashtags/${body}`, config);
}

async function listUsers() {
  const config = createHeaders();
  return axios.get(`${BASE_URL}/listusers`, config);
}

async function editPostText(body, id) {
  const config = createHeaders();
  return axios.put(`${BASE_URL}/timeline/posts/update/${id}`, body, config);
}

async function deleteFatalPost(id) {
  const config = createHeaders();
  return axios.delete(`${BASE_URL}/timeline/posts/delete/${id}`, config);
}

function likes(body) {
  return axios.post(`${BASE_URL}/timeline/like`, body);
}

function listLikes(id) {
  return axios.get(`${BASE_URL}/timeline/postsLikes/${id}`);
}

async function listUserPosts(id, limit) {
  const config = createHeaders();
  return axios.get(`${BASE_URL}/url/${id}?limit=${limit}`, config);
}

async function getUrlMetadata(url) {
  return await axios.get(`https://api.microlink.io/?url=${url}`);
}

async function insertHashtag(body) {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}/hashtags`, body, config);
}

async function listCommentsPost(postId) {
  const config = createHeaders();
  return await axios.get(`${BASE_URL}/timeline/comments/${postId}`, config);
}

async function createNewComment(body) {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}/timeline/newcomment`, body, config);
}

async function isFollowing(body) {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}/is-following`, body, config);
}

async function toggleFollow(body) {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}/follow-unfollow`, body, config);
}

export {
  register,
  login,
  publish,
  listPosts,
  userLogout,
  listHashtags,
  listPostsbyHashtags,
  listUsers,
  editPostText,
  deleteFatalPost,
  listUserPosts,
  likes,
  listLikes,
  getUrlMetadata,
  insertHashtag,
  listCommentsPost,
  createNewComment,
  isFollowing,
  toggleFollow,
};
