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

function listPosts() {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/timeline/posts`, config);
}

async function editPostText(body, id) {
	const config = createHeaders();
	return axios.patch(`${BASE_URL}/timeline/posts/update/${id}`, body, config);
}

async function deleteFatalPost(postId) {
	const config = createHeaders();
	return axios.delete(`${BASE_URL}/timeline/posts/delete/${postId}`, config);
}

async function userLogout() {
	const config = createHeaders();
	return axios.post(`${BASE_URL}/logout`, {}, config);
}

async function listHashtags() {
	const config = createHeaders();
	return await axios.get(`${BASE_URL}/hashtags`, config);
}

async function listPostsbyHashtags(body, limit) {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/hashtags/${body}?limit=${limit}`, config);
}

async function listUsers() {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/listusers`, config);
}

function likeDislike(body) {
	console.log(body);
	const config = createHeaders();
	return axios.post(`${BASE_URL}/timeline/like`, body, config);
}

function listLikes(id) {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/timeline/postsLikes/${id}`, config);
}

async function listUserPosts(id) {
	const config = createHeaders();
	return axios.get(`${BASE_URL}/url/${id}`, config);
}

async function insertHashtag(body) {
	const config = createHeaders();
	return await axios.post(`${BASE_URL}/hashtags`, body, config);
}

async function listComments(postId) {
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

/* async function listsPostsInterval() {
	const config = createHeaders();
	return await axios.get(`${BASE_URL}/timeline/setinterval`, config);
} */

function newRepost(id) {
	const config = createHeaders();
	return axios.post(`${BASE_URL}/timeline/reposts/${id}`, {}, config);
}

function deleteRepost(id) {
	const config = createHeaders();
	return axios.delete(`${BASE_URL}/timeline/delete-reposts/${id}`, config);
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
	likeDislike,
	listLikes,
	insertHashtag,
	listComments,
	createNewComment,
	deleteRepost,
	toggleFollow,
	isFollowing,
	newRepost,
	//listsPostsInterval,
};
