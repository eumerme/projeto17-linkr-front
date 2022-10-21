import { useState, useEffect } from "react";
import { publish, listPosts } from "../../services/linkr";
import TimelineStyles from "../../styles/TimelineStyles";
import PostStyles from "../../styles/PostStyles";
import styled from "styled-components";
import Loading from "../../styles/Loading";

function Timeline() {
	const [url, setUrl] = useState("");
	const [comment, setComment] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [msgBtn, setMsgBtn] = useState("Publish");
	const [posts, setPosts] = useState([]);
	const [existPost, setExistPost] = useState(false);
	const [errorServer, setErrorServer] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [upload, setUpload] = useState(true);
	const auth = JSON.parse(localStorage.getItem("linkr"));

	useEffect(() => {
		setTimeout(function () {
			listPosts()
				.then((data) => {
					setPosts(data.data);
					if (data.data.length === 0) setEmpty(true);
					else setExistPost(true);
				})
				.catch((error) => {
					setErrorServer(true);
				});
		}, 2000);
	}, [upload]);

	function publishPost(event) {
		event.preventDefault();
		setIsDisabled(true);
		setMsgBtn("Publishing...");
		if (url === " ") {
			setTimeout(function () {
				alert("É necessário compartilhar uma Url para publicar!");
				setIsDisabled(false);
				setMsgBtn("Publish");
			}, 1000);
		} else {
			publish({ url, comment })
				.then(() => {
					setMsgBtn("Publish");
					setIsDisabled(false);
					setUrl("");
					setComment("");
					setUpload(!upload);
				})
				.catch((error) => {
					if (error.response.status === 401) {
						alert("Sessão expirada, faça login novamente!");
						localStorage.clear("linkr");
						window.location.reload();
					} else {
						alert("Houve um erro ao publicar seu link");
						setMsgBtn("Publish");
						setUrl("");
						setComment("");
						setIsDisabled(false);
					}
				});
		}
	}

	return (
		<TimelineStyles>
			<Homescreen onSubmit={publishPost}>
				<Title>timeline</Title>
				<Publish>
					<div>
						<img src={auth.image} alt="profileImg"></img>
					</div>
					<form isDisabled={isDisabled}>
						<p>What are you going to share today?</p>
						<input
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							disabled={isDisabled}
							type="text"
							placeholder="http://..."
							required
						></input>
						<input
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							disabled={isDisabled}
							type="text"
							placeholder="Awesome article about..."
							required
						></input>
						<button type="onSubmit">{msgBtn}</button>
					</form>
				</Publish>

				{existPost ? (
					posts.map((value, index) => (
						<PostStyles
							key={index}
							img={value.imageUrl}
							user={value.name}
							text={value.text}
						/>
					))
				) : (
					<Loading error={+errorServer} empty={+empty} />
				)}
			</Homescreen>
		</TimelineStyles>
	);
}

const Homescreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.div`
	width: 611px;
	font-family: "Oswald", sans-serif;
	font-size: 43px;
	font-weight: 700;
	line-height: 63.73px;
	text-align: justify;
	color: #ffffff;
	margin: 78px 0 43px 0;
	@media screen and (max-width: 768px) {
		width: 100%;
		margin: 19px 0 19px 17px;
	}
`;

const Publish = styled.div`
	width: 611px;
	height: 209px;
	border-radius: 16px;
	background-color: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	display: flex;
	font-family: "Lato", sans-serif;
	div {
		width: 86px;
		display: flex;
		justify-content: center;
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 27px;
		margin: 16px 0 0 0;
		object-fit: cover;
	}
	form {
		width: 90%;
		display: flex;
		flex-direction: column;
		position: relative;
		p {
			font-size: 20px;
			font-weight: 300;
			line-height: 24px;
			color: #707070;
			margin: 21px 0 15px 0;
		}
		input {
			width: 95%;
			height: 30px;
			background-color: #efefef;
			border: none;
			border-radius: 5px;
			margin: 0 0 5px 0;
			::placeholder {
				padding: 0 0 0 13px;
				font-size: 15px;
				font-weight: 300;
				line-height: 18px;
				color: #949494;
			}
			:focus {
				outline: 0;
			}
		}
		input:nth-child(3) {
			height: 66px;
		}
		button {
			width: 112px;
			height: 31px;
			border-radius: 5px;
			background-color: #1877f2;
			border: none;
			color: #ffffff;
			font-size: 14px;
			font-weight: 700;
			line-height: 16.8px;
			position: absolute;
			bottom: 5px;
			right: 5%;
		}
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		border-radius: 0px;
		div {
			display: none;
		}
		form {
			width: 100%;
			align-items: center;
			button {
				right: 2.5%;
			}
		}
	}
`;

export { Timeline, Title, Homescreen };
