import styled from "styled-components";
import { useState } from "react";

import {
	redirectToHashtagPage,
	redirectToUserpage,
} from "../../../commom/resirectTo.js";
import { ReactTagify } from "react-tagify";
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import EditPost from "./EditPost.js";
import { useNavigate } from "react-router-dom";

const tagStyle = {
	fontSize: "17px",
	fontWeight: 700,
	color: "#FFFFFF",
	cursor: "pointer",
	margin: 0,
};

export default function Top({
	userId,
	name,
	authId,
	postId,
	text,
	openModal,
	repost,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<span>
				<h1
					onClick={() =>
						redirectToUserpage({
							userId,
							name,
							navigate,
						})
					}
				>
					{name}
				</h1>
				{authId === userId ? (
					<Options isRepost={repost.isRepost}>
						{repost.isRepost ? (
							""
						) : (
							<TiPencil
								style={{ cursor: "pointer" }}
								onClick={() => setIsEditing(!isEditing)}
							/>
						)}

						<FaTrash
							style={{ cursor: "pointer" }}
							onClick={() =>
								repost.isRepost
									? openModal("delete-repost", "delete")
									: openModal("delete-post", "delete")
							}
						/>
					</Options>
				) : (
					""
				)}
			</span>
			{isEditing ? (
				<EditPost
					id={postId}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					text={text}
				/>
			) : (
				<ReactTagify
					tagStyle={tagStyle}
					tagClicked={(tag) => redirectToHashtagPage({ tag, navigate })}
				>
					<p>{text}</p>
				</ReactTagify>
			)}
		</>
	);
}

const Options = styled.div`
	width: 55px;
	font-size: 20px;
	display: flex;
	justify-content: ${({ isRepost }) =>
		isRepost ? "flex-end" : "space-between"};
`;
