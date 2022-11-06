import Modal from "react-modal";
import {
	deleteFatalPost,
	newRepost,
	deleteRepost,
} from "../../../../../services/linkr.js";
import Loading from "../../../commom/Loading.js";
import { useState, useContext } from "react";
import UploadContext from "../../../../../Contexts/UploadContext.js";
import { ModalStyle } from "../Modal/styles.js";
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
	console.log("info ", info);

	const handleClick = () => {
		let promise;

		if (info.action === "delete-post") promise = deleteFatalPost(postId);
		if (info.action === "delete-repost") promise = deleteRepost(postId);
		if (info.action === "repost") promise = newRepost(postId);

		promise
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
				contentLabel="handleModal"
			>
				<ModalStyle>
					{isSucess ? (
						<Loading />
					) : (
						<>
							<p>{`Are you sure you want to ${info.type} this post?`}</p>
							<div>
								<button onClick={closeModal}>{`No, go back`}</button>
								<button
									onClick={handleClick}
									/* onClick={action === "delete" ? deletePost : repost} */
								>{`Yes, ${info.type} it`}</button>
							</div>
						</>
					)}
				</ModalStyle>
			</Modal>
		</>
	);
}
