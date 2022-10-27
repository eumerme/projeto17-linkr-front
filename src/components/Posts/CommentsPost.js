import styled from "styled-components";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useContext, useEffect, useRef, useState } from "react";
import { createNewComment } from "../../services/linkr";
import UploadContext from "../../Contexts/UploadContext";
import CommentArea from "./OneCommentPost";

export default function CommentsBox({ seeComments, postId, commentsData }) {
	const dropdownRef = useRef(null);
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
			<Container ref={dropdownRef} seeComments={seeComments}>
				<AllComents>
					{commentsData.map((value, index) => (
						<CommentArea
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
						<div>
							<TiLocationArrowOutline onClick={publishComment} />
						</div>
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
	display: none;
	flex-direction: column;
	align-items: center;
	font-family: "Lato", sans-serif;
	transform: translateY(-3px);
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

	${(props) => {
		if (props.seeComments) {
			return `
              &&& {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                display: flex;			
              } 
            `;
		}
	}}

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
		width: 39px;
		height: 39px;
		border-radius: 26.5px;
		object-fit: cover;
	}
`;

const TextArea = styled.div`
	width: 89.7%;
	position: relative;

	input {
		width: 100%;
		height: 39px;
		border: none;
		background: #252525;
		border-radius: 8px;
		color: #f3f3f3;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		padding: 0 0 0 15px;

		:focus {
			outline: 0;
		}

		::placeholder {
			color: #575757;
		}
	}

	div {
		position: absolute;
		right: 8px;
		top: 8px;
		font-size: 25px;
		color: #f3f3f3;
	}

	@media screen and (max-width: 611px) {
		width: 85%;
	}
`;
