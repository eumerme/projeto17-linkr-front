function redirectToUserpage({ setUpload, upload, userId, name, navigate }) {
	setUpload(!upload);
	navigate(`/user/${userId}`, {
		replace: false,
		state: { name },
	});
}

function redirectToHashtagPage({ setUpload, upload, tag, navigate }) {
	const hashtag = tag.replace("#", "");
	setUpload(!upload);
	navigate(`/hashtag/${hashtag}`);
}

export { redirectToHashtagPage, redirectToUserpage };
