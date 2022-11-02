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
	const [like, setLike] = useState(false);

	const handleLikes = () => {
		setIsLiked(!isLiked);

		const body = { postId, userId, isLiked };
		likeDislike(body)
			.then(() => {
				setUploadLikes(!uploadLikes);
				setLike(liked);
				/* const isliked = likedByIds?.filter((value) => value === auth.id);
				console.log({ isliked });
				if (isliked.lenght !== 0) {
					console.log("entrou");
					setLike(liked);
				} */
			})
			.catch((error) => console.log(error));
	};
	console.log({ isLiked, liked });

	useEffect(() => {
		const indexUser = likedByIds
			?.map((value, index) => {
				if (value === auth.id) {
					return index;
				}
			})
			.filter((value) => value !== undefined);

		const likedBy = likedByNames?.map((value, index) => {
			if (index === indexUser[0]) {
				return (value = " you");
			} else {
				return (value = ` ${value}`);
			}
		});

		const newlikes = Number(likes);
		if (newlikes === 1) {
			setMsg(`${likedBy[0]}`);
		}
		if (newlikes === 2) {
			setMsg(`${likedBy[0]} and${likedBy[1]}`);
		}
		if (newlikes === 3) {
			setMsg(`${likedBy[0]},${likedBy[1]} and${likedBy[2]}`);
		}
		if (newlikes > 3) {
			const x = newlikes - 3;
			setMsg(`${likedBy[0]},${likedBy[1]},${likedBy[2]} and other${x} people`);
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
