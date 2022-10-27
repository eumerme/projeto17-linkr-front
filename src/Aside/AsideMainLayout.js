import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UploadContext from "../Contexts/UploadContext";
import { listHashtags, toggleFollow } from "../services/linkr";
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from "react-icons/bs";

export default function AsideMainLayout({
	userpage,
	timeline,
	follows,
	followeeId,
	hashtag,
}) {
	const navigate = useNavigate();
	const [hashtags, setHashtags] = useState([]);
	const { setUpload, upload } = useContext(UploadContext);
	const auth = JSON.parse(localStorage.getItem("linkr"));
	const [isDisabled, setIsDisabled] = useState(false);
	const user = Number(followeeId) === auth.id;

	useEffect(() => {
		setTimeout(function () {
			listHashtags()
				.then((data) => {
					setHashtags(data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 1000);
	}, [upload]);

	const handleFollow = () => {
		setIsDisabled(true);

		setTimeout(function () {
			toggleFollow({ userId: auth.id, followeeId: Number(followeeId) })
				.then(() => {
					setUpload(!upload);
					setIsDisabled(false);
				})
				.catch((error) => {
					console.log(error);
					alert(
						"Não foi possível executar a operação. Tente novamente em instantes."
					);
					setIsDisabled(false);
				});
		}, 1000);
	};

	function redirect(text) {
		setUpload(!upload);
		navigate(`/hashtag/${text}`);
	}

	return (
		<Container timeline={timeline}>
			{userpage ? (
				<>
					<FollowButton
						follows={follows}
						onClick={handleFollow}
						disabled={isDisabled}
						user={user}
					>
						{follows ? "Unfollow" : "Follow"}
					</FollowButton>
					<FollowIcon onClick={handleFollow} disabled={isDisabled} user={user}>
						{follows ? <BsFillPersonCheckFill /> : <BsFillPersonPlusFill />}
					</FollowIcon>
				</>
			) : (
				""
			)}
			<TrendingBox hashtag={hashtag}>
				<h2>trending</h2>
				<ul>
					{hashtags.map((value, index) => (
						<li key={index} onClick={() => redirect(value.name)}>
							# {value.name}
						</li>
					))}
				</ul>
			</TrendingBox>
		</Container>
	);
}

const Container = styled.div`
	width: auto;
	height: auto;
	padding: 103px 0 0 50px;
	position: sticky;
	top: ${(props) => (props.timeline ? "153px" : "72px")};
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	@media screen and (max-width: 1024px) {
		position: fixed;
		padding: 0;
		top: 22px;
		right: 140px;
		z-index: 3;
	}

	@media screen and (max-width: 400px) {
		right: 125px;
	}
`;

const TrendingBox = styled.div`
	width: 300px;
	height: 406px;
	border-radius: 16px;
	background-color: #171717;
	margin-top: ${(props) => (props.hashtag ? "81px" : "0")};

	h2 {
		width: 100%;
		font-family: "Oswald", sans-serif;
		font-size: 27px;
		font-weight: 700;
		line-height: 40.01px;
		color: #ffffff;
		padding: 9px 0 12px 16px;
		border-bottom: 1px solid #484848;
	}
	ul {
		width: 90%;
		height: 293px;
		overflow-y: scroll;
		margin: 22px 0 0 16px;
		::-webkit-scrollbar {
			display: none;
		}
		li {
			font-family: "Lato", sans-serif;
			overflow-x: hidden;
			font-size: 19px;
			font-weight: 700;
			line-height: 22.08px;
			color: #ffffff;
			margin: 0 0 8px 0;
			cursor: pointer;
		}
	}

	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

const FollowButton = styled.button`
	width: 112px;
	height: 31px;
	margin-bottom: 50px;
	border-radius: 5px;
	background-color: ${(props) => (props.follows ? "#ffffff" : "#1877f2")};
	font-family: "Lato", sans-serif;
	font-size: 14px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => (props.follows ? "#1877f2" : "#ffffff")};
	cursor: pointer;
	outline: inherit;
	border: inherit;
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
	visibility: ${(props) => (props.user ? "hidden" : "visible")};

	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

const FollowIcon = styled.button`
	width: auto;
	height: auto;
	font-size: 25px;
	color: #f3f3f3;
	background-color: inherit;
	border: inherit;
	outline: inherit;
	cursor: pointer;
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
	visibility: ${(props) => (props.user ? "hidden" : "visible")};

	@media screen and (min-width: 1024px) {
		display: none;
	}
`;
