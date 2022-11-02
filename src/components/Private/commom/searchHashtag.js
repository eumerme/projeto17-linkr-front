import { insertHashtag } from "../../../services/linkr.js";

export default function searchHashtag({
	userId,
	postId,
	comment,
	uploadHashtagTrending,
	setUploadHashtagTrending,
}) {
	const hashtag = comment.split(" ").filter((value) => value.includes("#"));
	hashtag.forEach((value) => {
		const hashtagText = value.replace("#", "");
		const body = { hashtagText, postId, userId };
		insertHashtag(body)
			.then(() => setUploadHashtagTrending(!uploadHashtagTrending))
			.catch();
	});
}
