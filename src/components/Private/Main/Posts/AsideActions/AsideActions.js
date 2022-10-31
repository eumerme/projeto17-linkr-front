import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { AiOutlineComment } from "react-icons/ai";

export default function AsideActions({
	img,
	clickLike,
	ListLikes,
	msg,
	setSeeComments,
	seeComments,
	commentsLength,
}) {
	return (
		<Infos>
			<img src={img} alt="" />
			<div>{clickLike.draw}</div>
			<p data-tip={msg}>{ListLikes.likes} likes</p>
			<ReactTooltip
				backgroundColor="#FFFFFF"
				className="toopTip"
				place="bottom"
			/>
			<ReactTooltip
				backgroundColor="#FFFFFF"
				className="toopTip"
				place="bottom"
			/>
			<AiOutlineComment
				style={{
					cursor: "pointer",
					color: "#FFFFFF",
					fontSize: "28px",
				}}
				onClick={() => setSeeComments(!seeComments)}
			/>
			<p>{commentsLength} comments</p>
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
	//background-color: crimson;
	div {
		cursor: pointer;
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

	@media screen and (max-width: 330px) {
		img {
			width: 40px;
			height: 40px;
		}
	}
`;
