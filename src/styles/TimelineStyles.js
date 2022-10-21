import styled from "styled-components";

import Logout from "../components/Logout/Logout";
import HashtagBoxStyles from "./HashtagBoxStyles";

export default function TimelineStyles({ children, auth }) {
	return (
		<Container>
			<Navbar>
				<h1>linkr</h1>
				<Logout />
			</Navbar>
			{children}
			<HashtagBoxStyles />
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	background-color: crimson;
	margin-top: 72px;
	display: flex;
	align-items: flex-start;
	justify-content: space-around;
	background-color: #333333;
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
	}
	span {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 27px;
		margin: 0 0 0 17px;
		object-fit: cover;
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		img {
			margin: 0 0 0 12px;
		}
	}
`;
