function redirectToUserpage({ userId, name, navigate }) {
	navigate(`/user/${userId}`, {
		replace: false,
		state: { name },
	});
}

function redirectToHashtagPage({ setIsActive, isActive, tag, navigate }) {
	const hashtag = tag.replace("#", "");
	if (isActive) setIsActive(!isActive);
	navigate(`/hashtag/${hashtag}`);
}

export { redirectToHashtagPage, redirectToUserpage };
