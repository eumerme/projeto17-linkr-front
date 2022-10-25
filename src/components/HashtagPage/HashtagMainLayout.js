import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UploadContext from "../../Contexts/UploadContext";
import { listHashtags } from "../../services/linkr";

export default function HashtagMainLayout({ userpage, timeline, follows }) {
	const navigate = useNavigate();
	const [hashtags, setHashtags] = useState([]);
	const { upload } = useContext(UploadContext);
	console.log(follows);
	useEffect(() => {
		setTimeout(function () {
			listHashtags()
				.then((data) => {
					setHashtags(data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 500);
	}, [upload]);

	function redirect(text) {
		navigate(`/hashtag/${text}`);
	}

	return (
		<Container timeline={timeline}>
			{userpage ? (
				<FollowButton follows={follows}>
					{follows ? "Unfollow" : "Follow"}
				</FollowButton>
			) : (
				""
			)}
			<TrendingBox>
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
	top: ${(props) => (props.timeline ? "155px" : "72px")};
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	@media screen and (max-width: 1024px) {
		display: none;
		/* position: absolute;
		padding: 0;
		top: 200px; */
	}
`;

const TrendingBox = styled.div`
	width: 300px;
	height: 406px;
	border-radius: 16px;
	background-color: #171717;

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

const FollowButton = styled.div`
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
`;

//const FollowButton = styled``;
