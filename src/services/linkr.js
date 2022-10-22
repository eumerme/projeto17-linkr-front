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

async function listUserPosts(id) {
	console.log("linkr ", id);
	const config = createHeaders();
	return axios.get(`${BASE_URL}/url/${id}`, config);
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
};
