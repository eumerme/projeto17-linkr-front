import { useContext, useState } from "react";
import styled from "styled-components";
import UploadContext from "../../../../Contexts/UploadContext.js";
import { publish } from "../../../../services/linkr.js";
import searchHashtag from "../../commom/searchHashtag.js";

export default function PublishBox() {
	const [isDisabled, setIsDisabled] = useState(false);
	const [msgBtn, setMsgBtn] = useState("Publish");
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
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [publishForm, setPublishForm] = useState({
		url: "",
		comment: "",
	});

	const handleInputs = (e) => {
		setPublishForm({
			...publishForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleForm = (e) => {
		e.preventDefault();
		setIsDisabled(true);
		setMsgBtn("Publishing...");
		const body = { ...publishForm };

		publish(body)
			.then(() => {
				setUploadPosts(!uploadPosts);
				setUploadComments(!uploadComments);
				setUploadLikes(!uploadLikes);

				if (publishForm.comment.includes("#")) {
					searchHashtag({
						userId: auth.id,
						comment: publishForm.comment,
						uploadHashtagTrending,
						setUploadHashtagTrending,
					});
				}

				setIsDisabled(false);
				setMsgBtn("Publish");
				setPublishForm({ url: "", comment: "" });
			})
			.catch(() => {
				alert(
					"An error occured while trying to publish your post, please try again"
				);
				setMsgBtn("Publish");
				setIsDisabled(false);
				setPublishForm({ url: "", comment: "" });
			});
	};

	return (
		<Publish>
			<div>
				<img src={auth.image} alt="profileImg" />
			</div>
			<Form onSubmit={handleForm} isDisabled={isDisabled}>
				<p>What are you going to share today?</p>
				<input
					type="url"
					placeholder="http://..."
					required
					value={publishForm.url}
					name="url"
					onChange={handleInputs}
					disabled={isDisabled}
				/>
				<input
					type="text"
					placeholder="Awesome article about..."
					value={publishForm.comment}
					name="comment"
					onChange={handleInputs}
					disabled={isDisabled}
					maxLength={200}
				/>
				<button type="onSubmit" disabled={isDisabled}>
					{msgBtn}
				</button>
			</Form>
		</Publish>
	);
}

const Publish = styled.div`
	width: 611px;
	height: 209px;
	border-radius: 16px;
	background-color: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3% 4%;
	margin-bottom: 35px;

	div {
		width: auto;
		height: 100%;
	}

	img {
		width: 50px;
		height: 50px;
	}

	@media screen and (max-width: 611px) {
		width: 100%;
		max-width: 611px;
		border-radius: 0px;

		div {
			display: none;
		}

		form {
			padding: 0;
		}
	}
`;

const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	padding-left: 20px;

	p {
		width: 100%;
		font-size: 20px;
		font-weight: 300;
		color: #707070;
		margin-bottom: 15px;
		padding-left: 5px;
	}

	input {
		width: 100%;
		height: 30px;
		background-color: #efefef;
		border: none;
		outline: none;
		border-radius: 5px;
		padding-left: 13px;
		font-size: 15px;
		font-weight: 300;
		opacity: ${({ isDisabled }) => (isDisabled ? "0.6" : "1")};
	}
	input:nth-child(3) {
		margin: 7px 0;
		height: 66px;
	}
	button {
		width: 112px;
		height: 31px;
		font-size: 14px;
		font-weight: 700;
		color: #ffffff;
		border: inherit;
		outline: inherit;
		border-radius: 5px;
		background-color: #1877f2;
		opacity: ${({ isDisabled }) => (isDisabled ? "0.6" : "1")};
		cursor: pointer;
	}
`;
