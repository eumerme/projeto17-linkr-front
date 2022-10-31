import { insertHashtag } from "../../../services/linkr.js";

export default function searchHashtag({
	userId,
	comment,
	uploadHashtagTrending,
	setUploadHashtagTrending,
}) {
	console.log(comment, userId, uploadHashtagTrending, setUploadHashtagTrending);
	const hashtag = comment.split(" ").filter((value) => value.includes("#"));
	hashtag.forEach((value) => {
		const hashtagText = value.replace("#", "");
		const body = { hashtagText, id: userId };
		insertHashtag(body)
			.then(() => setUploadHashtagTrending(!uploadHashtagTrending))
			.catch();
	});
}
