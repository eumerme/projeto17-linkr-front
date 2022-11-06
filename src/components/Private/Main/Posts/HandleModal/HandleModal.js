import Modal from "react-modal";
import {
	deleteFatalPost,
	newRepost,
	deleteRepost,
	deleteComment,
} from "../../../../../services/linkr.js";
import Loading from "../../../commom/Loading.js";
import { useState, useContext } from "react";
import UploadContext from "../../../../../Contexts/UploadContext.js";
import { ModalStyle } from "./styles.js";
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

export default function HandleModal({ modalIsOpen, setIsOpen, postId, info }) {
	const [isSucess, setIsSucess] = useState(true);
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

	const handleClick = () => {
		setIsSucess(false);
		let promise;

		if (info.action === "delete-post") promise = deleteFatalPost(postId);
		if (info.action === "delete-repost") promise = deleteRepost(postId);
		if (info.action === "repost") promise = newRepost(postId);
		if (info.action === "delete-comment")
			promise = deleteComment(info.commentId);

		promise
			.then(() => {
				setIsSucess(true);
				setUploadPosts(!uploadPosts);
				setUploadHashtagTrending(!uploadHashtagTrending);
				setUploadComments(!uploadComments);
				setUploadLikes(!uploadLikes);
				setIsOpen(false);
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
				contentLabel="handleModal"
			>
				<ModalStyle>
					{isSucess ? (
						<>
							<p>{`Are you sure you want to ${info.type} this ${
								info.action === "delete-comment" ? "comment" : "post"
							}?`}</p>
							<div>
								<button onClick={closeModal}>{`No, go back`}</button>
								<button onClick={handleClick}>{`Yes, ${info.type} it`}</button>
							</div>
						</>
					) : (
						<Loading />
					)}
				</ModalStyle>
			</Modal>
		</>
	);
}
