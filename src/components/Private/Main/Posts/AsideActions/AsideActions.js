import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import Likes from "../Likes/Likes";

export default function AsideActions({
	img,
	postId,
	userId,
	setSeeComments,
	seeComments,
	commentsLength,
	likedByNames,
	likedByIds,
	likes,
	isLiked,
	setIsLiked,
	openModal,
	repostsAmount,
	isRepost,
}) {
	return (
		<Infos>
			<img src={img} alt="" />
			<Likes
				postId={postId}
				userId={userId}
				likedByNames={likedByNames}
				likedByIds={likedByIds}
				likes={likes}
				isLiked={isLiked}
				setIsLiked={setIsLiked}
				isRepost={isRepost}
			/>
			<div onClick={() => setSeeComments(!seeComments)}>
				<AiOutlineComment />
				<p>
					{commentsLength} {" comments"}
				</p>
			</div>
			<div onClick={() => (isRepost ? "" : openModal("repost", "repost"))}>
				<BiRepost />
				<p>
					{Number(repostsAmount)} {" re-posts"}
				</p>
			</div>
		</Infos>
	);
}

const Infos = styled.div`
	width: auto;
	height: 100%;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		cursor: pointer;
		color: #ffffff;
		font-size: 28px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-bottom: 20px;
	}

	p {
		margin: 5px 0 10px 0;
		color: #ffffff;
		font-weight: 400;
		font-size: 11px;
		cursor: pointer;
		text-align: center;
		width: 60px;
	}

	.toopTip {
		border-radius: 3px;
		font-weight: 700;
		font-size: 11px;
		color: #505050;
	}

	@media screen and (max-width: 380px) {
		img {
			width: 47px;
			height: 47px;
		}
	}

	@media screen and (max-width: 315px) {
		img {
			width: 40px;
			height: 40px;
		}
	}
`;
