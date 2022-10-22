import axios from "axios";
import { auth } from "../components/commom/localStorage";

//const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const BASE_URL = `http://localhost:4000`;

function createHeaders() {
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

async function listPosts() {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/timeline/posts`, config);
}

async function userLogout() {
	const config = createHeaders();
	return axios.post(`${BASE_URL}/logout`, {}, config);
}

async function listHashtags() {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/hashtags`, config);
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
	return axios.post(`${BASE_URL}/timeline/likes`, body);
}

async function listUserPosts(id) {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/url/${id}`, config);
}

async function getUrlMetadata(url) {
	return axios.get(`https://api.microlink.io/?url=${url}`);
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
	getUrlMetadata,
};
