import styled from "styled-components";
import Modal from "react-modal";
import { deleteFatalPost } from "../../../../../services/linkr.js";
import Loading from "../../../commom/Loading.js";
import { useState, useContext } from "react";
import UploadContext from "../../../../../Contexts/UploadContext.js";
Modal.setAppElement(document.querySelector(".root"));

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		background: "none",
		border: "none",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export default function DeleteModal({ modalIsOpen, setIsOpen, postId }) {
	const [isSucess, setIsSucess] = useState(false);
	const {
		uploadPosts,
		setUploadPosts,
		uploadHashtagTrending,
		setUploadHashtagTrending,
		uploadLikes,
		setUploadLikes,
		uploadComments,
		setUploadComments,
	} = useContext(UploadContext);

	const closeModal = () => {
		setIsOpen(false);
	};

	const deletePost = () => {
		deleteFatalPost(postId)
			.then(() => {
				setUploadPosts(!uploadPosts);
				setUploadHashtagTrending(!uploadHashtagTrending);
				setIsSucess(true);

				setTimeout(() => {
					setUploadComments(!uploadComments);
					setUploadLikes(!uploadLikes);
					setIsOpen(false);
					setIsSucess(false);
				}, 1200);
			})
			.catch(() => {
				alert("Houve um problema com a sua requisição, tente novamente!");
				setIsOpen(false);
			});
	};

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="DeletePostModal"
			>
				<Style>
					{isSucess ? (
						<Loading />
					) : (
						<>
							<p>Are you sure you want to delete this post?</p>
							<div>
								<button onClick={closeModal}>No, go back</button>
								<button onClick={deletePost}>Yes, delete it</button>
							</div>
						</>
					)}
				</Style>
			</Modal>
		</>
	);
}

const Style = styled.div`
	width: 597px;
	height: 262px;
	background: #333333;
	border-radius: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	padding: 5% 10%;

	p {
		font-weight: 700;
		font-size: 34px;
		line-height: 40px;
		text-align: center;
		color: #ffffff;
	}

	div {
		width: 100%;
		display: flex;
		justify-content: space-evenly;

		button {
			width: auto;
			height: auto;
			background: #ffffff;
			border: none;
			border-radius: 5px;
			font-weight: 700;
			font-size: 18px;
			color: #1877f2;
			cursor: pointer;
			padding: 10px;
		}

		button:nth-child(2) {
			background: #1877f2;
			color: #ffffff;
		}
	}
	@media screen and (max-width: 645px) {
		width: 300px;
		height: 200px;
		p {
			font-size: 20px;
			line-height: 25px;
		}
		button:nth-child(1) {
			margin-right: 2.5px;
		}
		button:nth-child(2) {
			margin-left: 2.5px;
		}
		button:nth-child(1),
		button:nth-child(2) {
			font-size: 14px;
		}
	}
`;
