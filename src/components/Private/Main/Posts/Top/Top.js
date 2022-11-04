import styled from "styled-components";
import { useState, useContext } from "react";

import {
	redirectToHashtagPage,
	redirectToUserpage,
} from "../../../commom/resirectTo.js";
import { ReactTagify } from "react-tagify";
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import EditPost from "./EditPost.js";
import { useNavigate } from "react-router-dom";
import UploadContext from "../../../../../Contexts/UploadContext.js";

const tagStyle = {
	fontSize: "17px",
	fontWeight: 700,
	color: "#FFFFFF",
	cursor: "pointer",
	margin: 0,
};

export default function Top({ userId, name, authId, postId, text, openModal }) {
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();
	const { upload, setUpload } = useContext(UploadContext);

	return (
		<>
			<span>
				<h1
					onClick={() =>
						redirectToUserpage({
							setUpload,
							upload,
							userId,
							name,
							navigate,
						})
					}
				>
					{name}
				</h1>
				{authId === userId ? (
					<Options>
						<TiPencil
							style={{ cursor: "pointer" }}
							onClick={() => setIsEditing(!isEditing)}
						/>

						<FaTrash style={{ cursor: "pointer" }} onClick={openModal} />
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
					tagClicked={(tag) =>
						redirectToHashtagPage({ setUpload, upload, tag, navigate })
					}
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
	justify-content: space-between;
`;
