import styled from "styled-components";
import Logout from "../Logout/Logout";
import HashtagMainLayout from "../HashtagPage/HashtagMainLayout";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UploadContext from "../../Contexts/UploadContext.js";

export default function TimelineMainLayout({
	children,
	userpage,
	timeline,
	follows,
	followeeId,
}) {
	const navigate = useNavigate();
	const { setUpload, upload } = useContext(UploadContext);

	useEffect(() => {
		setTimeout(() => {
			document
				.getElementById("search")
				.scrollIntoView({ block: "center", behavior: "smooth" });
		}, 500);
	}, []);

	const redirectTo = () => {
		setUpload(!upload);
		navigate("/timeline");
	};

	return (
		<Container>
			<Navbar>
				<h1 onClick={redirectTo}>linkr</h1>
				<Logout />
			</Navbar>
			{children}
			<HashtagMainLayout
				userpage={userpage}
				timeline={timeline}
				follows={follows}
				followeeId={followeeId}
			/>
			<SearchUser />
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding-top: 72px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	background-color: #333333;
	padding-bottom: 60px;
	position: relative;

	@media screen and (max-width: 768px) {
		padding-top: 130px;
	}
`;

const Navbar = styled.div`
	width: 100%;
	height: 72px;
	background-color: #151515;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ffffff;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1;
	padding: 0 28px;

	h1 {
		font-size: 49px;
		font-weight: 700;
		line-height: 53.95px;
		font-family: "Passion One", cursive;
		cursor: pointer;
	}
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 27px;
		margin: 0 0 0 17px;
		object-fit: cover;
	}
`;
