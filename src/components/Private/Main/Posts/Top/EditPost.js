import styled from "styled-components";
import { useEffect, useRef, useState, useContext } from "react";
import { editPostText } from "../../../../../services/linkr.js";
import UploadContext from "../../../../../Contexts/UploadContext.js";
import searchHashtag from "../../../commom/searchHashtag.js";

export default function EditPost({
	isEditing,
	setIsEditing,
	text,
	id,
	upload,
	setUpload,
}) {
	const [comment, setComment] = useState(text);
	const [isDisabled, setIsDisabled] = useState(false);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const inputRef = useRef(null);
	const {
		setUploadHashtagTrending,
		uploadHashtagTrending,
		setUploadPosts,
		uploadPosts,
	} = useContext(UploadContext);

	const pageClickEvent = (e) => {
		if (e.keyCode === 27) {
			setIsEditing(false);
			window.removeEventListener("keyup", pageClickEvent);
		}
	};

	useEffect(() => {
		if (isEditing) {
			inputRef.current.focus();
			window.addEventListener("keyup", pageClickEvent);
		}
	}, [isEditing]);

	const textEdited = (e) => {
		if (e.key === "Enter") {
			setIsDisabled(true);
			searchHashtag({
				userId: auth.id,
				comment,
				uploadHashtagTrending,
				setUploadHashtagTrending,
			});
			editPostText({ comment, id })
				.then(() => {
					setIsEditing(!isEditing);
					setUploadPosts(!uploadPosts);
				})
				.catch(() => {
					alert("Não foi possível salvar suas alterações, tente novamente!");
					setIsDisabled(false);
				});
		}
	};

	return (
		<EditText
			value={comment}
			onChange={(e) => setComment(e.target.value)}
			onKeyPress={textEdited}
			ref={inputRef}
			type="text"
			disabled={isDisabled}
			required
		></EditText>
	);
}

const EditText = styled.input`
	width: 100%;
	height: auto;
	border: inherit;
	outline: inherit;
	border-radius: 8px;
	cursor: pointer;
	margin-bottom: 10px;
	padding: 4px 9px;
	font-weight: 400;
	font-size: 14px;
	color: #4c4c4c;
`;
