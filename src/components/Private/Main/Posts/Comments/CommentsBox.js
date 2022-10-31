import styled from "styled-components";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useContext, useEffect, useRef, useState } from "react";
import { createNewComment } from "../../../../../services/linkr.js";
import UploadContext from "../../../../../Contexts/UploadContext.js";
import Comment from "./Comment.js";

export default function CommentsBox({ seeComments, postId, commentsData }) {
	const inputRef = useRef(null);
	const auth = JSON.parse(localStorage.getItem("linkr"));

	const [isDisabled, setIsDisabled] = useState(false);
	const [comment, setComment] = useState("");

	const { upload, setUpload } = useContext(UploadContext);

	useEffect(() => {
		if (seeComments) {
			inputRef.current.focus();
		}
	}, [seeComments]);

	function sendWithEnter(e) {
		if (e.key !== "Enter") return;
		publishComment();
	}

	function publishComment(e) {
		if (e) e.preventDefault();
		if (comment === " ") {
			alert("É necessário escrever alguma coisa no seu comentário!");
		}
		setIsDisabled(true);
		const body = { comment, postId };

		createNewComment(body)
			.then(() => {
				setComment("");
				setUpload(!upload);
				setIsDisabled(false);
			})
			.catch(() => {
				alert("Ops! Houve um erro com sua requisição, tente novamente");
				setIsDisabled(false);
			});
	}

	return (
		<>
			<Container>
				<AllComents>
					{commentsData.map((value, index) => (
						<Comment
							key={index}
							imageUrl={value.imageUrl}
							commentUserId={value.commentUserId}
							postUserId={value.postUserId}
							name={value.name}
							comment={value.comment}
							followee={value.followee}
						/>
					))}
				</AllComents>

				<WriterArea>
					<img src={auth.image} alt="" />
					<TextArea>
						<input
							placeholder="write a comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							ref={inputRef}
							onKeyPress={sendWithEnter}
							type="text"
							disabled={isDisabled}
						></input>
						<SendIcon>
							<TiLocationArrowOutline onClick={publishComment} />
						</SendIcon>
					</TextArea>
				</WriterArea>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100%;
	max-width: 611px;
	height: auto;
	background: #1e1e1e;
	border-radius: 0 0 16px 16px;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 611px) {
		width: 100%;
		border-radius: 0;
	}
`;

const AllComents = styled.div`
	width: 100%;
	max-height: 285px;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;

	//background-color: coral;

	::-webkit-scrollbar {
		display: none;
	}

	@media screen and (max-width: 611px) {
		max-height: 244px;
	}
`;

const WriterArea = styled.div`
	width: 93%;
	height: 83px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	img {
		width: 50px;
		height: 50px;
		margin-right: 10px;
	}

	@media screen and (max-width: 352px) {
		img {
			width: 45px;
			height: 45px;
		}
	}
`;

const TextArea = styled.div`
	width: 89.7%;
	//position: relative;
	display: flex;
	align-items: center;
	background-color: #252525;
	border-radius: 8px;

	input {
		width: 100%;
		height: 39px;
		border: none;
		background-color: inherit;
		border-radius: 8px;
		color: #f3f3f3;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		padding: 0 10px;
		outline: inherit;

		::placeholder {
			color: #575757;
		}
	}

	@media screen and (max-width: 611px) {
		width: 85%;
	}
`;

const SendIcon = styled.div`
	font-size: 25px;
	color: #f3f3f3;
	padding-right: 5px;
`;
