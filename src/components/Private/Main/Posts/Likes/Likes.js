import ReactTooltip from "react-tooltip";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import UploadContext from "../../../../../Contexts/UploadContext";
import { likeDislike } from "../../../../../services/linkr";

export default function Likes({
	postId,
	userId,
	likedByNames,
	likedByIds,
	likes,
	liked,
}) {
	const [isLiked, setIsLiked] = useState(false);
	const { uploadLikes, setUploadLikes } = useContext(UploadContext);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [msg, setMsg] = useState("");

	useEffect(() => {
		setTimeout(() => {
			setIsLiked(liked);
		}, 1200);
	}, [liked]);

	const handleLikes = () => {
		setIsLiked(!isLiked);

		const body = { postId, userId, isLiked };
		likeDislike(body)
			.then(() => setUploadLikes(!uploadLikes))
			.catch();
	};

	useEffect(() => {
		const indexUser = likedByIds
			?.map((userId, index) => {
				if (userId === auth.id) {
					return index;
				}
			})
			.filter((userId) => userId !== undefined);

		const likedBy = likedByNames?.map((username, index) => {
			if (index === indexUser[0]) {
				return (username = " you");
			} else {
				return (username = ` ${username}`);
			}
		});

		const likesNum = Number(likes);
		if (likesNum === 1) {
			setMsg(`${likedBy[0]}`);
		}
		if (likesNum === 2) {
			setMsg(`${likedBy[0]} and${likedBy[1]}`);
		}
		if (likesNum === 3) {
			setMsg(`${likedBy[0]},${likedBy[1]} and${likedBy[2]}`);
		}
		if (likesNum > 3) {
			const x = likesNum - 3;
			setMsg(`${likedBy[0]},${likedBy[1]},${likedBy[2]} and other ${x} people`);
		}
	}, [likes]);

	return (
		<>
			<div onClick={handleLikes}>
				{!liked ? <AiOutlineHeart /> : <AiFillHeart style={{ color: "red" }} />}
			</div>
			<ReactTooltip type="light" className="toopTip" place="bottom" />
			<p data-tip={msg}>{likes} likes</p>
		</>
	);
}
