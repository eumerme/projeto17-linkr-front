import styled from "styled-components";
import { TiLocationArrowOutline } from "react-icons/ti";
import { useContext, useState } from "react";
import { createNewComment } from "../../../../../services/linkr.js";
import UploadContext from "../../../../../Contexts/UploadContext.js";
import Comment from "./Comment.js";

export default function CommentsBox({
	postId,
	comments,
	commentUserId,
	isRepost,
}) {
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [isDisabled, setIsDisabled] = useState(false);
	const [comment, setComment] = useState("");
	const { uploadComments, setUploadComments } = useContext(UploadContext);

	const publishComment = (e) => {
		e.preventDefault();
		setIsDisabled(true);
		const body = { comment, postId, commentUserId };

		createNewComment(body)
			.then(() => {
				setComment("");
				setIsDisabled(false);
				setUploadComments(!uploadComments);
			})
			.catch(() => setIsDisabled(false));
	};

	return (
		<>
			<Container>
				<AllComents>
					{comments.map((value, index) => (
						<Comment
							key={index}
							imageUrl={value.imageUrl}
							commentUserId={value.commentUserId}
							postUserId={value.postUserId}
							name={value.name}
							comment={value.comment}
							userId={auth.id}
						/>
					))}
				</AllComents>

				{isRepost ? (
					""
				) : (
					<>
						<WriterArea>
							<img src={auth.image} alt="" />
							<TextArea onSubmit={publishComment}>
								<input
									placeholder="write a comment..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									type="text"
									disabled={isDisabled}
									required
									autoFocus
								></input>
								<SendIcon type="onSubmity" disabled={isDisabled}>
									<TiLocationArrowOutline />
								</SendIcon>
							</TextArea>
						</WriterArea>
					</>
				)}
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100%;
	max-width: 611px;
	height: auto;
	background-color: #1e1e1e;
	border-radius: 0 0 16px 16px;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 611px) {
		border-radius: 0;
	}
`;

const AllComents = styled.div`
	width: 100%;
	max-height: 320px;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;

	::-webkit-scrollbar {
		display: none;
	}
`;

const WriterArea = styled.div`
	width: 93%;
	height: 83px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid #353535;

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

const TextArea = styled.form`
	width: 89.7%;
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

const SendIcon = styled.button`
	background-color: inherit;
	outline: inherit;
	border: inherit;
	border-radius: 8px;
	font-size: 25px;
	color: #f3f3f3;
	padding-right: 5px;
	padding-top: 5px;
`;
