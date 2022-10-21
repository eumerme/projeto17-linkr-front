import axios from "axios";

// const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const BASE_URL = `http://localhost:4000`;

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
	return axios.post(`${BASE_URL}/timeline/publish`, body);
}

async function listPosts() {
	return axios.get(`${BASE_URL}/timeline/posts`);
}

async function userLogout() {
	const config = createHeaders();
	return axios.post(`${BASE_URL}/logout`, {}, config);
}

function listHashtags() {
	return axios.get(`${BASE_URL}/hashtags`);
}

function listPostsbyHashtags(body) {
	return axios.get(`${BASE_URL}/hashtags/${body}`);
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
	likes
};
