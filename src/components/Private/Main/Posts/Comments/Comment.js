import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isFollowing } from "../../../../../services/linkr.js";
import { redirectToUserpage } from "../../../commom/resirectTo.js";
import { FaTrash } from "react-icons/fa";

export default function Comment({
	imageUrl,
	commentUserId,
	postUserId,
	name,
	comment,
	userId,
	openModal,
	commentId,
}) {
	const navigate = useNavigate();
	const [commentTag, setCommentTag] = useState("");

	useLayoutEffect(() => {
		const body = { userId: userId, followeeId: commentUserId };
		isFollowing(body).then((res) => {
			if (res.data.follows === true) {
				setCommentTag("• following");
			}
		});
		if (commentUserId === postUserId) {
			setCommentTag("• post’s author");
		}
	}, []);

	return (
		<>
			<Container>
				<img src={imageUrl} alt="" />
				<Infos>
					<Top>
						<h1
							onClick={() => {
								redirectToUserpage({
									name,
									navigate,
									userId: commentUserId,
								});
							}}
						>
							{name} <strong>{commentTag}</strong>
						</h1>
						{userId === commentUserId ? (
							<FaTrash
								style={{
									cursor: "pointer",
									fontSize: "15px",
									color: "#ffffff",
								}}
								onClick={() => openModal("delete-comment", "delete", commentId)}
							/>
						) : (
							""
						)}
					</Top>
					<span>{comment}</span>
				</Infos>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 93%;
	min-height: 80px;
	border-bottom: 1px solid #353535;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-top: 10px;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}

	img {
		position: sticky;
		top: 4px;
		width: 50px;
		height: 50px;
	}

	@media screen and (max-width: 352px) {
		img {
			width: 45px;
			height: 45px;
		}
	}
`;

const Infos = styled.div`
	width: 100%;
	height: auto;
	padding-left: 10px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	word-wrap: break-word;
	word-break: break-all;
	line-height: 20px;

	span {
		font-weight: 400;
		font-size: 14px;
		color: #acacac;
		padding-top: 5px;
	}
`;

const Top = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	h1 {
		font-weight: 700;
		font-size: 14px;
		color: #f3f3f3;
		cursor: pointer;

		strong {
			color: #565656;
			font-weight: 400;
			padding-left: 3px;
		}
	}
`;
